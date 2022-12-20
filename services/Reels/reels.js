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
const userReelModel = require('../../models/Reels/userReelSchema.js');
const pointsModel = require('../../models/points/pointsSchema');

const { response } = require('../../routes/index.js');

/**
 * Register User
 * @param {object} -  User
 * @returns {object}
 **/
const reelsService = async (reelsData) => {

	// Save User Reels in the database
	const user = new userReelModel(reelsData);
	const result = await user.save(user);
	return result;
};

/**
 * Fetch all Users
 * @param {object} data - "Fetch All Users "
 * @returns {object}
 **/
const fetchAllDataForReels = async () => {
	try {
		const reelsRecord = await userReelModel.find();
		if (!reelsRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.REELS_ARE_NOT_AVAILABLE };
		}
		else {
			return { isSuccess: true, data: reelsRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};


const findReelsServices = async (data) => {
	try {
		const userRecord = await userReelModel.find(data);
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_NOT_FOUND };
		}
		else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.USER_NOT_FOUND };
	}
}


const saveTokenForLogin = async (data) => {
	try {
		const savedata = await userTokenModel(data);
		const result = await savedata.save(savedata);
	} catch (err) {
		return "Error"
	}
}



/**
 * Checks if a User record exists
 * @param {object} data User data object
 * @returns {object}
 **/
const checkUserRecord = async (data) => {
	try {
		const userRecord = await userModel.find(data).exec();
		logger.info(SUCCESS_MESSAGE.ADMIN_RECORD_CHECKED);
		return { isSuccess: true, data: userRecord.length > 0 ? true : false };
	} catch (err) {
		logger.error(ERROR_MESSAGE.CHECKING_ADMIN_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.CHECKING_ADMIN_ERROR };
	}
};

/**
 * Fetch User record
 * @param {object} data - "Fetch User record using Email or Phone Number"
 * @returns {object}
 **/
const fetchUserRecord = async (data) => {
	try {
		const userRecord = await userModel.findOne(data).exec();
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
		} else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};


/**
 * Updates the user record
 * @param {Object} data - 'Update user record using Phone Number'
 * @returns {object}
 **/
const updateReelRecord = async (data) => {
	try {
		const userUpdateRecord = await userReelModel.updateOne(
			{ _id: data._id },
			{ $set: data }
		);
		if (!userUpdateRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_IN_REEL };
		} else {
			return { isSuccess: true, data: userUpdateRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};


/**
 * Fetch User Id record
 * @param {object} data - "Fetch User Id record "
 * @returns {object}
 **/
const fetchReelId = async (data) => {
	try {
		console.log("data",data)
		const reelRecord = await userReelModel.findOne(data).exec();
		console.log("reelRecord",reelRecord)
		if (!reelRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.REEL_ID_NOT_EXIST };
		}
		else {
			return { isSuccess: true, data: reelRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};


/**
 * Delete Reel record
 * @param {object} data - "Delete user record using reel by _id "
 * @returns {object}
 **/
const deleteReelRecord = async (data) => {
	try {
		const reelRecord = await userReelModel.findOneAndDelete(data).exec();
		if (!reelRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.REEL_ID_NOT_EXIST };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.DELETE_REEL_RECORD };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};



const searchAllDataReel = async (input) => {
	try {

		const userRecord = await userReelModel.find({
			"$or": [{ title: { $regex: input } },
			{ caption: { $regex: input } }, { language: { $regex: input } }]
		})
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.TEXT_SEARCH_NOT_EXIST };
		} else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}

const likeUser = async (checkUserInDB, reelId, data) => {
	try {
		
		const a = await userReelModel.updateOne({ _id: reelId }, { $push: { likes: checkUserInDB } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_LIKE };
		} else {
			const pointsDataResponse =  new pointsModel(data);
	        const result = await pointsDataResponse.save(pointsDataResponse);
			if (!result) {
				return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_POINTS };
			}
			return { isSuccess: true, data: SUCCESS_MESSAGE.LIKE_REEL_RECORD };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}
//ERROR_IN_UNLIKE
const unLikeUser = async (checkUserInDB, reelId) => {
	try {
		const a = await userReelModel.updateOne({ _id: reelId }, { $pull: { likes: checkUserInDB } });
		if (!a) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_IN_UNLIKE };
		} else {
			return { isSuccess: true, data: SUCCESS_MESSAGE.UNLIKE_REEL_RECORD };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}


module.exports = {
	reelsService,
	fetchAllDataForReels,
	findReelsServices,
	updateReelRecord,
	fetchReelId,
	deleteReelRecord,
	searchAllDataReel,
	likeUser,
	unLikeUser,

	saveTokenForLogin,
	checkUserRecord,
	fetchUserRecord,

};
