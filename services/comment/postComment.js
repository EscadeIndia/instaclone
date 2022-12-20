// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 07/09/2022
// *
// * Purpose			: Admin data storing services
// *
// * Revision History	:
// *
// * Date			Author			Jira			Functionality
// *
// **********************************************************************
const { logger } = require('../../utils/logger.js');
const {
	ERROR_MESSAGE,
	REQ_HEADER,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	HEADER_KEY_TOKEN,
	MESSAGES,
} = require('../../utils/constants.js');
const commentPostModel = require('../../models/comment/commentPostSchema.js');
//const userPostModel = require('../../models/Reels/userPostSchema.js');
const { response } = require('../../routes/index.js');

/**
 * Register comment
 * @param {object} -  User
 * @returns {object}
 **/
const postCommentService = async (postCommentData) => {
 
    
   // const update = await userReelModel.updateOne({ _id: reelId },{ $push: { likes: currentUserId } })
	// Save User Reels in the database
	const user = new commentPostModel(postCommentData);
	const result = await user.save(user);
	return result;
};


const findCommentWithID = async(data)=>{
	try{
		const userComments = await commentPostModel.find(data);
		if (!userComments) {
			return { isSuccess: false, data: ERROR_MESSAGE.COMMENT_NOT_FOUND };
		}
		else {
			return { isSuccess: true, data: userComments };
		}
	}catch(err){
		return { isSuccess: false, data: ERROR_MESSAGE.COMMENT_NOT_FOUND };
	}
}

const updateCommentRecord = async(_id , updatedComment)=>{
    try{
    	const userUpdateRecord = await commentPostModel.updateOne(
			{ _id: _id },
			{ $set: {comments: updatedComment} }
		);

        if (!userUpdateRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_POST_NOT_FOUND };
		}
		else {
			return { isSuccess: true, data: userUpdateRecord };
		}
    }catch(err){
        return { isSuccess: false, data: ERROR_MESSAGE.COMMENT_NOT_FOUND };
    }
}


/**
 * Fetch User Id record
 * @param {object} data - "Fetch User Id record "
 * @returns {object}
 **/
const checkCommentIdExist = async (data) => {
	try {   
        console.log("service data", data)     
        const commentRecord = await commentPostModel.findOne(data).exec();
        console.log("service CommentRecord", commentRecord)
		if (!commentRecord) {         
			return { isSuccess: false, data : ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
		}
		else {            
			return { isSuccess: true, data: commentRecord };
		}
	} catch (err) {        
		logger.error(ERROR_MESSAGE.FETCHING_OPERATOR_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_OPERATOR_ERROR };
	}
};



/**
 * Delete User record
 * @param {object} data - "Delete admin operator record using operator by id "
 * @returns {object}
 **/
const deleteCommentRecord = async (data) => {
	try {
		const userRecord = await commentPostModel.findOneAndDelete(data).exec();
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_ID_NOT_EXIST };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.DELETE_USER_RECORD };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};



const likeComment = async (currentUserId,commentId)=>{
	try{
		const a =	await commentPostModel.updateOne( { _id: commentId },{ $push: { likes: currentUserId } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_LIKE };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.LIKE_COMMENT_RECORD };
		}
	}catch(err){
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}

/**
 * Fetch User Id record
 * @param {object} data - "Fetch User Id record "
 * @returns {object}
 **/
const fetchCommentId = async (data) => {
	try {        
        const commentRecord = await commentPostModel.findOne(data).exec();
		if (!commentRecord) {         
			return { isSuccess: false, data : ERROR_MESSAGE.COMMENT_ID_NOT_EXIST };
		}
		else {            
			return { isSuccess: true, data: commentRecord };
		}
	} catch (err) {        
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};

//ERROR_IN_UNLIKE
const unLikeComment = async (currentUserId,commentId)=>{
	try{
		const a =	await commentPostModel.updateOne( { _id: commentId },{ $pull: { likes: currentUserId } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_UNLIKE };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.UNLIKE_COMMENT_RECORD };
		}
	}catch(err){
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}


module.exports={ postCommentService , findCommentWithID ,updateCommentRecord ,checkCommentIdExist ,deleteCommentRecord,
	fetchCommentId ,likeComment, unLikeComment
 
}