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
const { logger } = require("../../utils/logger.js");
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
  postService,
  fetchAllDataForPost,
  findPostServices,
  updatePostRecord,
  fetchPostId,
  deletePostRecord,
  searchAllDataPost,
  likeUser,
  unLikeUser

} = require("../../services/Post/post.js");
const { fetchUserRecord } = require("../../services/user/user.js");

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
const upload = multer({ dest: './postUploadAddress/' }).fields([{ name: 'postImageVideo', maxCount: 10 }]);
let postUploadAddress;

/** 
 * Upload Post function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const uploadPost = async (request, response) => {
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
      postUploadAddress = request.files.postImageVideo;
      localStorage.setItem('postUploadAddress', postUploadAddress[0].location);

      const postData = {
        userId: request.body.userId,
        postImageVideo: postUploadAddress[0].path,
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

      const result = await postService(postData);
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
const fetchAllPost = async (request, response) => {
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

    const postExists = await fetchAllDataForPost();
    if (!postExists.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.POST_ARE_NOT_AVAILABLE));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(postExists))
    }

  } catch (err) {
    errorHandler(err, response);
  }
}


const fetchPostForSingleUser = async (request, response) => {
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


    const findUser = await findPostServices({ userId: checkUserInDB });
    if (!findUser.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.USER_POST_NOT_FOUND));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findUser))
    }
  } catch (err) {
    return { isSuccess: false, data: ERROR_MESSAGE.USER_POST_NOT_FOUND };
  }
}

/**
 * updateUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
const updatePost = async (request, response) => {


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
  const updateReelResponse = await updatePostRecord(updateData);
  if (!updateReelResponse.isSuccess) {
    return response
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json(errorResponse(ERROR_MESSAGE.ERROR_UPDATE_IN_POST));
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
const deletePost = async (request, response) => {
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
    const fetchOperatorRecord = await fetchPostId({ _id: _id });
    if (!fetchOperatorRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.POST_ID_NOT_EXIST));
    }
    else {
      const deleteResponse = deletePostRecord({ _id: _id });
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.DELETE_POST_RECORD));
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
const searchPost = async (request, response) => {
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
    const fetchdata = await searchAllDataPost(input);
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


const likePost = async (request, response) => {
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

    const postId = request.body.postId;
    const fetchReelRecord = await fetchPostId({ _id: postId });
    if (!fetchReelRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.REEL_ID_NOT_EXIST));
    }
    let test = fetchReelRecord.data.likes.includes(checkUserInDB);
    if (test == false) {
      let likeUserResponse = await likeUser(checkUserInDB, postId);
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.LIKE_POST_RECORD));
    } else {
      let unlike = await unLikeUser(checkUserInDB, postId)
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.UNLIKE_POST_RECORD));
    }

  }
  catch (err) {
    errorHandler(err, response);
  }
}


module.exports = {
  uploadPost,
  fetchAllPost,
  fetchPostForSingleUser,
  updatePost,
  deletePost,
  searchPost,
  likePost
  // uplodeVideo
};
