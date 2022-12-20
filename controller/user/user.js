// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 07/09/2022
// *
// * Purpose			: User data accumulation Controller
// *
// * Revision History	:
// *
// * Date			Author			Jira			Functionality
// **********************************************************************

const crypto = require("../../utils/crypto.js");
const { logger } = require("../../utils/logger.js");
const emailvalidator = require("email-validator");
const moment = require("moment");
const Web3 = require("web3");
const {
  createJwe,
  createJws,
  decryptJwe,
  verifyJws,
} = require("../../utils/jsonToken.js");
const {
  successResponse,
  errorResponse,
  errorHandler,
} = require("../../utils/response.js");
const {

  registerUser,
  saveLogInSessions,
  registerForLoginSeession,
  checkUserNameRecord,
  checkEmailInData,
  fetchAllDataOfUsers,
  findUserDataWithToken,
  checkUserNameRecordForIndividual,
  storyResponse,
  deleteStoryResponse,
  saveTokenForLogin,
  checkUserRecord,
  fetchUserRecord,
  searchAllData,
  updateUserRecord,
  fetchUserId,
  deleteUserRecord,
  updateFollowResponse,
  updateUnFollowResponse
} = require("../../services/user/user.js");

const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} = require("../../utils/constants.js");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { response } = require("express");
const { request } = require("http");
const { Console } = require("console");
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./uploads');
const upload = multer({ dest: './profilePictureAddress/' }).fields([{ name: 'profilePicture', maxCount: 10 }]);

let profilePictureAddress;


const loginWithGoogle = async (request, response) => {
  try {
    if (
      !("phoneNumberOrEmail" in request.body) ||
      !("userName" in request.body) ||
      !(request.body.phoneNumberOrEmail != "") ||
      !(request.body.userName != "")
    ) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
    }
    const data = {
      phoneNumberOrEmail: request.body.phoneNumberOrEmail,
      userName: request.body.userName
    };
    const result = await registerUser(data);
    return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));
  } catch (err) {
    errorHandler(err, response);
  }

}

/**
 * addUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const registerUserA = async (request, response) => {
  try {
    upload(request, response, async function (err) {

      // CHECK IF DATA IS PROVIDED
      if (
        !("emailOrNumber" in request.body)
      ) {
        return response
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
      }

      // // File Uplode
      // fileUploadAddress = request.files.fileUpload;
      // localStorage.setItem('fileUploadAddress', fileUploadAddress[0].location);


      const emailOrNumber = request.body.emailOrNumber;

      const check = isNaN(emailOrNumber)
      console.log(check)
      if (check == true) {
        email = request.body.emailOrNumber
        number = request.body.number;
        number = null;

      } else {
        number = request.body.emailOrNumber
        email = request.body.email
        email == null

      }
      // Check Email Validation is stored in DB or Not
      const checkEmail = await checkEmailInData({ email: emailOrNumber });
      if (!checkEmail.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.EMAIL_NUMBER_ALREADY_EXISTS));
      }

      // Check Email Validation is stored in DB or Not
      const checkNumber = await checkEmailInData({ number: emailOrNumber });
      if (!checkNumber.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.EMAIL_NUMBER_ALREADY_EXISTS));
      }

      const dataForUserSchema = {
        userName: emailOrNumber.toLowerCase(),
        email: email,
        number: number,
        dob: request.body.dob,
        gender: request.body.gender,
      };



      //   const userName = request.body.userName.toLowerCase();
      //  // let convertedUserName = data.userName.toLowerCase();

      //   const userNameExists = await checkUserNameRecord({ userName: userName });
      // 	if (userNameExists.data) {
      // 		return response
      // 			.status(HTTP_STATUS_CODE.NOT_FOUND)
      // 			.json(errorResponse(ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS));
      //}
      const result = await registerUser(dataForUserSchema);
      return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));
    })
  } catch (err) {
    errorHandler(err, response);
  }
};


/**
 * Check User Name Avivalibity function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const checkUserNameAvivalibity = async (request, response) => {
  try {
    const userName = request.query.userName;
    const userNameExists = await checkUserNameRecordForIndividual({ userName: userName });
    if (userNameExists.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(errorResponse(SUCCESS_MESSAGE.USER_AVAILABLE));

    } else {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS));
    }
  } catch (err) {
    errorHandler(err, response);
  }
}

/**
 * Fetch All Users function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const fetchAllUsers = async (request, response) => {
  try {


    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }


    const userNameExists = await fetchAllDataOfUsers();
    if (!userNameExists.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.USER_ARE_NOT_AVAILABLE));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(userNameExists))
    }

  } catch (err) {
    errorHandler(err, response);
  }
}


const fetchUsersWithToken = async (request, response) => {
  try {
    const token = request.query.token

    const findUser = await findUserDataWithToken({ tokenAfterRegistration: token });
    if (!findUser.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.TOKEN_NOT_FOUND));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findUser))
    }
  } catch (err) {
    return { isSuccess: false, data: ERROR_MESSAGE.TOKEN_NOT_FOUND };
  }
}


/**
 * Login function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const login = async (request, response) => {
  try {
    // Check whether input is present or not
    if (!("emailOrNumber" in request.body)) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
    }
    let userIdResponse;
    const emailOrNumber = request.body.emailOrNumber;
    emailOrNumber.toLowerCase()

    const check = isNaN(emailOrNumber)
    if (check == true) {
      const fetchUserResponse = await fetchUserRecord({ email: emailOrNumber })
      if (!fetchUserResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json(errorResponse(ERROR_MESSAGE.USER_DOES_NOT_EXIST));
      }
    } else {
      const fetchUserResponse = await fetchUserRecord({ number: emailOrNumber })
      if (!fetchUserResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json(errorResponse(ERROR_MESSAGE.USER_DOES_NOT_EXIST));
      }

    }

    const checkForFetch = isNaN(emailOrNumber)
    if (checkForFetch == true) {
      email = request.body.emailOrNumber
      number = request.body.number;
      number = null;
      const findUser = await findUserDataWithToken({ email: emailOrNumber });
      userIdResponse = findUser.data.userId
    } else {
      number = request.body.emailOrNumber
      email = request.body.email
      email == null
      const findUser = await findUserDataWithToken({ number: emailOrNumber });
      userIdResponse = findUser.data.userId

    }
    //  // Check Email Validation is stored in DB or Not
    //   const checkEmail = await checkEmailInData( {email : emailOrNumber} );
    //   if(!checkEmail.isSuccess){
    //     return response
    //     .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
    //     .json(errorResponse(ERROR_MESSAGE.EMAIL_NUMBER_ALREADY_EXISTS));
    //   }
    //const data = { emailOrNumber: emailOrNumber, password: hashedPassword };

    const dataForLoginSession = {
      source: request.body.source,
      ip: request.body.ip,
      deviceID: request.body.deviceID,
      location: request.body.location,
      status: request.body.status,
      emailOrPhoneNumber: emailOrNumber
    }

    // 1. Creating JWE
    const jweResponse = await createJwe({
      userId: userIdResponse,
    });
    if (!jweResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
    }
    const jwe = jweResponse.data;
    // 2. Signing JWE
    const token = createJws(jwe);

    const saveLogInSession = await saveLogInSessions(dataForLoginSession);
    // const saveToken = await saveTokenForLogin ({tokenForLogin: token , emailOrNumber: emailOrNumber});
    logger.info(SUCCESS_MESSAGE.LOGIN);
    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(SUCCESS_MESSAGE.USER, { saveLogInSession, token }));
  } catch (err) {
    errorHandler(err, response);
  }
};

/**
 * fetch USER function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const fetchUser = async (request, response) => {
  try {
    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const userId = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: userId });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(fetchUserResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(fetchUserResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};




/**
 * Search data function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const search = async (request, response) => {
  try {

    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }


    const input = request.query.input;
    const fetchdata = await searchAllData(input);
    if (!fetchdata.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(fetchdata.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(fetchdata));
    }

  } catch (err) {
    errorHandler(err, response);
  }

}

const updateProfilePicture = async (request, response) => {
  try {
    upload(request, response, async function (err) {

      const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
      // Verify Token
      const verifiedToken = await verifyJws(token);
      if (!verifiedToken.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
      }
      // Decrypt Jwe Token
      const decryptedData = await decryptJwe(verifiedToken.data);
      const checkUserInDB = decryptedData.data.userId;

      const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
      if (!fetchUserResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
      }

      profilePictureAddress = request.files.profilePicture;
      localStorage.setItem('profilePictureAddress', profilePictureAddress[0].location);

      const data = {
        userId: checkUserInDB,
        profilePicture: profilePictureAddress[0].path,

      };

      const updateData = {};
      for (var attributename in data) {
        if (data[attributename] != null) {
          updateData[attributename] = data[attributename];
        }
      }
      const updateUserResponse = await updateUserRecord(updateData);
      console.log("updateUserResponse Controller", updateUserResponse)
      if (!updateUserResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
      } else {
        return response
          .status(HTTP_STATUS_CODE.OK)
          .json(successResponse(updateUserResponse));
      }
    })
  } catch (err) {
    errorHandler(err, response);
  }
}


/**
 * updateUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const updateUser = async (request, response) => {

  upload(request, response, async function (err) {


    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }

    const userName = request.body.userName;
    const name = request.body.name;
    const email = request.body.email;
    const number = request.body.number;
    const dob = request.body.dob;
    const gender = request.body.gender;
    const status = request.body.status;
    const avtar = request.body.avtar;
    const bio = request.body.bio;
    const language = request.body.language;

    //Input validation
    if (email != undefined) {
      if (!emailvalidator.validate(request.body.email)) {
        return response
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(errorResponse(ERROR_MESSAGE.INVALID_INPUT));
      }
    }
    const data = {
      userId: checkUserInDB,
      userName: userName,
      name: name,
      email: email,
      number: number,
      dob: dob,
      gender: gender,
      status: status,
      avtar: avtar,
      bio: bio,
      language: language
    };

    const updateData = {};
    for (var attributename in data) {
      if (data[attributename] != null) {
        updateData[attributename] = data[attributename];
      }
    }
    const updateUserResponse = await updateUserRecord(updateData);
    if (!updateUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(updateUserResponse));
    }
  });
};

/**
* Delete User using ID number
* @param {object} request - HTTPS request
* @param {object} response - HTTPS response
* @returns {object} HTTPS response
*/
const deleteUser = async (request, response) => {
  try {


    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }
    const fetchOperatorRecord = await fetchUserId({ userId: checkUserInDB });
    if (!fetchOperatorRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }
    else {
      const deleteOperatorResponse = deleteUserRecord({ userId: checkUserInDB });
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.DELETE_USER_RECORD));
    }

  } catch (err) {
    errorHandler(err, response);
  }
};

const follow = async (request, response) => {
  try {

    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }
    const followUserID = request.body.followUser;
    const updateData = await updateFollowResponse(followUserID, checkUserInDB)
    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(updateData));
  } catch (err) {
    errorHandler(err, response);
  }
}


const unfollow = async (request, response) => {
  try {
    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
    // Verify Token
    const verifiedToken = await verifyJws(token);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
    }
    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const checkUserInDB = decryptedData.data.userId;

    const fetchUserResponse = await fetchUserRecord({ userId: checkUserInDB });
    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }
    const followUserID = request.body.unfollowUser;
    const updateData = await updateUnFollowResponse(followUserID, checkUserInDB)
    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(updateData));
  } catch (err) {
    errorHandler(err, response);
  }
}
module.exports = {
  loginWithGoogle,
  registerUserA,

  checkUserNameAvivalibity,
  fetchAllUsers,
  fetchUsersWithToken,
  login,
  fetchUser,
  search,
  updateUser,
  updateProfilePicture,
  deleteUser,
  follow,
  unfollow
  // uplodeVideo
};
