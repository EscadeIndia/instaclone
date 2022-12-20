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
const userPostModel = require('../../models/Post/userPostSchema.js');
const { response } = require('../../routes/index.js');

/**
 * Register User
 * @param {object} -  User
 * @returns {object}
 **/
const postService = async (postData) => {

	// Save User Reels in the database
	const user = new userPostModel(postData);
	const result = await user.save(user);
	return result;
};

/**
 * Fetch all Users
 * @param {object} data - "Fetch All Users "
 * @returns {object}
 **/
const fetchAllDataForPost = async () => {
	try {
		const reelsRecord = await userPostModel.find();
		if (!reelsRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.POST_ARE_NOT_AVAILABLE };
		}
		else {
			return { isSuccess: true, data: reelsRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.POST_ARE_NOT_AVAILABLE + err);
		return { isSuccess: false, data: ERROR_MESSAGE.POST_ARE_NOT_AVAILABLE };
	}
};


const findPostServices = async (data) => {
	try {
		const userRecord = await userPostModel.find(data);
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_POST_NOT_FOUND };
		}
		else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.USER_POST_NOT_FOUND };
	}
}


/**
 * Updates the user record
 * @param {Object} data - 'Update user record using Phone Number'
 * @returns {object}
 **/
const updatePostRecord = async (data) => {
	try {
		const userUpdateRecord = await userPostModel.updateOne(
			{ _id: data._id },
			{ $set: data }
		);
		if (!userUpdateRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_IN_POST };
		} else {
			return { isSuccess: true, data: userUpdateRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.ERROR_UPDATE_IN_POST + err);
		return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_IN_POST };
	}
};


/**
 * Fetch User Id record
 * @param {object} data - "Fetch User Id record "
 * @returns {object}
 **/
const fetchPostId = async (data) => {
	try {
		const reelRecord = await userPostModel.findOne(data).exec();
		if (!reelRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.POST_ID_NOT_EXIST };
		}
		else {
			return { isSuccess: true, data: reelRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.POST_ID_NOT_EXIST + err);
		return { isSuccess: false, data: ERROR_MESSAGE.POST_ID_NOT_EXIST };
	}
};


/**
 * Delete Reel record
 * @param {object} data - "Delete user record using reel by _id "
 * @returns {object}
 **/
const deletePostRecord = async (data) => {
	try {
		const reelRecord = await userPostModel.findOneAndDelete(data).exec();
		if (!reelRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.POST_ID_NOT_EXIST };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.DELETE_POST_RECORD };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};



const searchAllDataPost = async (input) => {
	try {

		const userRecord = await userPostModel.find({
			"$or": [{ title: { $regex: input } },
			{ caption: { $regex: input } }, { language: { $regex: input } }]
		})
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.TEXT_SEARCH_NOT_EXIST };
		} else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_ADMIN_ERROR };
	}
}


const likeUser = async (checkUserInDB, postId) => {
	try {
		const a = await userPostModel.updateOne({ _id: postId }, { $push: { likes: checkUserInDB } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_LIKE };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.LIKE_POST_RECORD };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}
//ERROR_IN_UNLIKE
const unLikeUser = async (checkUserInDB, postId) => {
	try {
		const a = await userPostModel.updateOne({ _id: postId }, { $pull: { likes: checkUserInDB } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_UNLIKE };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.UNLIKE_POST_RECORD };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}

module.exports = {
	postService,
	fetchAllDataForPost,
	findPostServices,
	updatePostRecord,
	fetchPostId,
	deletePostRecord,
	searchAllDataPost,
	likeUser,
	unLikeUser
};
