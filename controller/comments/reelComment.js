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
  reelcommentService,
  findCommentWithID,
  updateCommentRecord,
  checkCommentIdExist,
  deleteCommentRecord,
  likeComment, unLikeComment, fetchCommentId,
  postService,
  fetchAllDataForPost,
  findPostServices,
  updatePostRecord,
  fetchPostId,
  deletePostRecord,
  searchAllDataPost,

} = require("../../services/comment/reelcomment.js");
const { fetchUserRecord } = require("../../services/user/user.js");

const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} = require("../../utils/constants.js");
const { response } = require("express");
const { request } = require("http");
const { Console } = require("console");



const reelComment = async (request, response) => {
  try {

    // CHECK IF DATA IS PROVIDED
    if (
      !("userId" in request.body),
      !("reelId" in request.body),
      !("comments" in request.body)
    ) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
    }


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


    const reelCommentData = {
      userId: request.body.userId,
      reelId: request.body.reelId,
      currentUserId: checkUserInDB,
      comments: request.body.comments,
    };

    const result = await reelcommentService(reelCommentData);
    return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));

  } catch (err) {
    errorHandler(err, response);
  }
}

const fetchReelComments = async (request, response) => {
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

    const reelID = request.query.reelId

    const findcomment = await findCommentWithID({ reelId: reelID });
    if (!findcomment.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json(errorResponse(ERROR_MESSAGE.COMMENT_NOT_FOUND));
    }
    else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findcomment))
    }
  } catch (err) {
    return { isSuccess: false, data: ERROR_MESSAGE.COMMENT_NOT_FOUND };
  }
}

const updateReelComment = async (request, response) => {
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
    const _id = request.query.commentId;
    const updatedComment = request.query.newComment;
    const updateCommentResponse = await updateCommentRecord(_id, updatedComment);
    if (!updateCommentResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(updateCommentResponse));
    }

  } catch (err) {
    return { isSuccess: false, data: ERROR_MESSAGE.COMMENT_NOT_FOUND };
  }

}

/**
* Delete User using ID number
* @param {object} request - HTTPS request
* @param {object} response - HTTPS response
* @returns {object} HTTPS response
*/
const deleteReelComment = async (request, response) => {
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

    const commentId = request.query.commentId;
    const fetchOperatorRecord = await checkCommentIdExist({ _id: commentId });
    console.log(fetchOperatorRecord)
    if (!fetchOperatorRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.USER_ID_NOT_EXIST));
    }
    else {
      const deleteOperatorResponse = deleteCommentRecord({ _id: commentId });
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.DELETE_USER_RECORD));
    }

  } catch (err) {
    errorHandler(err, response);
  }
};


const likeReelComment = async (request, response) => {
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

    const commentId = request.body.commentId;
    const fetchReelRecord = await fetchCommentId({ _id: commentId });
    console.log(fetchReelRecord)
    if (!fetchReelRecord.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.COMMENT_ID_NOT_EXIST));
    }
    let test = fetchReelRecord.data.likes.includes(checkUserInDB);
    if (test == false) {
      let likeUserResponse = await likeComment(checkUserInDB, commentId);
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.LIKE_COMMENT_RECORD));
    } else {
      let unlike = await unLikeComment(checkUserInDB, commentId)
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(SUCCESS_MESSAGE.UNLIKE_COMMENT_RECORD));
    }

  }
  catch (err) {
    errorHandler(err, response);
  }
}

module.exports = {
  reelComment, fetchReelComments, updateReelComment, deleteReelComment, likeReelComment
};