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
// fetchUserRecord
const { fetchUserRecord } = require("../../services/user/user.js");
const {
  reelsService,
  fetchAllDataForReels,
  findReelsServices,
  updateReelRecord,
  fetchReelId,
  deleteReelRecord,
  searchAllDataReel,
  likeUser,
  unLikeUser,

  // saveTokenForLogin,
  // checkUserRecord,
  // fetchUserRecord,
} = require("../../services/Reels/reels.js");

const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} = require("../../utils/constants.js");
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { response } = require("express");
const { request } = require("http");
const { Console } = require("console");
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./uploads');
const upload = multer({ dest: './reelUploadAddress/' }).fields([{ name: 'reelImageVideo', maxCount: 10 }]);
let reelUploadAddress;

/**
 * addUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const uploadReels = async (request, response) => {
  try {
    upload(request, response, async function (err) {

      // CHECK IF DATA IS PROVIDED
      // if (
      //   !("emailOrNumber" in request.body) 
      // ) {
      //   return response
      //     .status(HTTP_STATUS_CODE.BAD_REQUEST)
      //     .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
      // }


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

      // File Uplode
      reelUploadAddress = request.files.reelImageVideo;
      localStorage.setItem('reelUploadAddress', reelUploadAddress[0].location);

      const reelsData = {
        userId: checkUserInDB,
        reelImageVideo: reelUploadAddress[0].path,
        language: request.body.language,
        hashTag: request.body.hashTag,
        commenting: request.body.commenting,
        shareing: request.body.shareing,
        status: request.body.status,
        title: request.body.title,
        caption: request.body.caption,
        like: request.body.like,
        comments: request.body.comments,
        share: request.body.share,

      };

      const result = await reelsService(reelsData);
      return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));
    })
  } catch (err) {
    errorHandler(err, response);
  }
};

/**
 * Fetch All Users function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const fetchAllReels = async (request, response) => {
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

    const reelsExists = await fetchAllDataForReels();
    if (!reelsExists.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.REELS_ARE_NOT_AVAILABLE));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(reelsExists))
    }

  } catch (err) {
    errorHandler(err, response);
  }
}


const fetchReelsForSingleUser = async (request, response) => {
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

    const findUser = await findReelsServices({ userId: checkUserInDB });
    if (!findUser.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.USER_NOT_FOUND));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findUser))
    }
  } catch (err) {
    return { isSuccess: false, data: ERROR_MESSAGE.USER_NOT_FOUND };
  }
}

/**
 * updateUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const updateReel = async (request, response) => {

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

  const _id = request.body._id;
  const language = request.body.language;
  const hashTag = request.body.hashTag;
  const commenting = request.body.commenting;
  const shareing = request.body.shareing;
  const status = request.body.status;
  const title = request.body.title;
  const caption = request.body.caption;

  const data = {
    _id: _id,
    language: language,
    hashTag: hashTag,
    commenting: commenting,
    shareing: shareing,
    status: status,
    title: title,
    caption: caption
  };

  const updateData = {};
  for (var attributename in data) {
    if (data[attributename] != null) {
      updateData[attributename] = data[attributename];
    }
  }
  const updateReelResponse = await updateReelRecord(updateData);
  if (!updateReelResponse.isSuccess) {
    return response
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json(errorResponse(ERROR_MESSAGE.ERROR_UPDATE_IN_REEL));
  } else {
    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(updateReelResponse));
  }
};

/**
* Delete Reel using _id number
* @param {object} request - HTTPS request
* @param {object} response - HTTPS response
* @returns {object} HTTPS response
*/
const deleteReel = async (request, response) => {
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

    const _id = request.body._id;
    const fetchOperatorRecord = await fetchReelId({ _id: _id });
    if (!fetchOperatorRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.REEL_ID_NOT_EXIST));
    }
    else {
      const deleteResponse = deleteReelRecord({ _id: _id });
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.DELETE_REEL_RECORD));
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
const searchReel = async (request, response) => {
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
    const fetchdata = await searchAllDataReel(input);
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



const likeReel = async (request, response) => {

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
    const reelId = request.body.reelId;
    const source = request.body.source;
    let pointsForLike = 5;
    const data = {
      userId: checkUserInDB,
      source:source,
      points: pointsForLike,

    }
    console.log("reelId",reelId)
    const fetchReelRecord = await fetchReelId({ _id: reelId });
    console.log("fetchReelRecord",fetchReelRecord)
    if (!fetchReelRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.REEL_ID_NOT_EXIST));
    }
    let test = fetchReelRecord.data.likes.includes(checkUserInDB);
    if (test == false) {
      let likeUserResponse = await likeUser(checkUserInDB, reelId ,data);
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.LIKE_REEL_RECORD));
    } else {
      let unlike = await unLikeUser(checkUserInDB, reelId, data)
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.UNLIKE_REEL_RECORD));
    }
  }
  catch (err) {
    errorHandler(err, response);
  }
}

module.exports = {
  uploadReels,
  fetchAllReels,
  fetchReelsForSingleUser,
  updateReel,
  deleteReel,
  searchReel,
  likeReel
  // uplodeVideo
};
