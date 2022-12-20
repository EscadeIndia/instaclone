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

//const bcrypt = require('bcryptjs');
const crypto = require('../../utils/crypto.js');
//const userModel = require('../../models/user/userSchema');
//const questionModel = require('../../models/adminModel/questionSchema');
const userModel = require('../../models/user/userSchema');

//const { fetchAllUserRecord } = require('../../services/user/user.js');
const { logger } = require('../../utils/logger.js');
const {
	ERROR_MESSAGE,
	REQ_HEADER,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	HEADER_KEY_TOKEN,
	MESSAGES,
} = require('../../utils/constants.js');
const userTokenModel = require('../../models/user/userTokenSchema.js');
const loginsessionModel = require('../../models/user/loginSessionSchema.js')
const { request } = require('http');
const { response } = require('../../routes/index.js');

/**
 * Register User
 * @param {object} -  User
 * @returns {object}
 **/
const registerUser = async (dataForUserSchema, dataForLoginSession) => {

	// Save User in the database
	const user = new userModel(dataForUserSchema);
	const result = await user.save(user);
	return result;
};

/**
 * Register User
 * @param {object} -  User
 * @returns {object}
 **/
const saveLogInSessions = async (dataForLoginSession) => {

	// Save User in the database
	const loginSession = new loginsessionModel(dataForLoginSession);
	const saveLoginSessions = await loginSession.save(loginSession);
	return saveLoginSessions;
};



const checkUserNameRecord = async (data) => {
	try {
		const userNameRecord = await userModel.findOne(data).exec();
		if (userNameRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS };
		} else {
			return { isSuccess: true, data: userNameRecord };
		}
	} catch (err) {
		//	logger.error(ERROR_MESSAGE.CHECKING_ADMIN_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS };
	}
};

//checkEmailInData

const checkEmailInData = async (data) => {
	try {
		const emailRecord = await userModel.findOne(data).exec();
		if (emailRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.EMAIL_NUMBER_ALREADY_EXISTS };
		} else {
			return { isSuccess: true }
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.EMAIL_NUMBER_ALREADY_EXISTS };
	}
}

const checkUserNameRecordForIndividual = async (data) => {
	try {
		const userNameRecord = await userModel.findOne(data).exec();
		if (userNameRecord) {
			logger.info(ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS);
			return { isSuccess: false, data: ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS };
		} else {
			logger.info(SUCCESS_MESSAGE.USER_AVAILABLE);
			return { isSuccess: true, data: SUCCESS_MESSAGE.USER_AVAILABLE };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS + err);
		return { isSuccess: false, data: ERROR_MESSAGE.USER_NAME_ALREADY_EXISTS };
	}
};


/**
 * Fetch all Users
 * @param {object} data - "Fetch All Users "
 * @returns {object}
 **/
const fetchAllDataOfUsers = async () => {
	try {
		const usersAllRecord = await userModel.find();
		if (!usersAllRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_ARE_NOT_AVAILABLE };
		}
		else {
			return { isSuccess: true, data: usersAllRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.USER_ARE_NOT_AVAILABLE + err);
		return { isSuccess: false, data: ERROR_MESSAGE.USER_ARE_NOT_AVAILABLE };
	}
};


const findUserDataWithToken = async (data) => {
	try {
		const userRecord = await userModel.findOne(data);
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.TOKEN_NOT_FOUND };
		}
		else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.TOKEN_NOT_FOUND };
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
			return { isSuccess: false, data: ERROR_MESSAGE.USER_ID_NOT_EXIST };
		} else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
};



const searchAllData = async (input) => {
	try {

		const userRecord = await userModel.find({
			"$or": [{ userName: { $regex: input } },
			{ name: { $regex: input } }, { email: { $regex: input } }]
		})
		console.log(userModel);
		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.TEXT_SEARCH_NOT_EXIST };
		} else {
			return { isSuccess: true, data: userRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_ADMIN_ERROR };
	}
}


/**
 * Updates the user record
 * @param {Object} data - 'Update user record using Phone Number'
 * @returns {object}
 **/
const updateUserRecord = async (data) => {
	try {
		console.log("data.userId", data.userId)
		const userUpdateRecord = await userModel.updateOne(
			{ userId: data.userId },
			{ $set: data }
		);
		console.log(userUpdateRecord)
		if (!userUpdateRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.USER_ID_NOT_EXIST };
		}

		else {
			return { isSuccess: true, data: userUpdateRecord };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.ERROR_UPDATE_ADMININFO + err);
		return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_ADMININFO };
	}
};

/**
 * Fetch User Id record
 * @param {object} data - "Fetch User Id record "
 * @returns {object}
 **/
const fetchUserId = async (data) => {
	try {
		const operatorRecord = await userModel.findOne(data).exec();
		if (!operatorRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
		}
		else {
			return { isSuccess: true, data: operatorRecord };
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
const deleteUserRecord = async (data) => {
	try {
		const userRecord = await userModel.findOneAndDelete(data).exec();
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

const updateFollowResponse = async (followUserID, checkUserInDB) => {
	try {

		const a = await userModel.updateOne({ userId: followUserID }, { $push: { followers: checkUserInDB } });
		const b = await userModel.updateOne({ userId: checkUserInDB }, { $push: { following: followUserID } });
		return a, b
	}
	catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}


const updateUnFollowResponse = async (followUserID, checkUserInDB) => {
	try {

		const a = await userModel.updateOne({ userId: followUserID }, { $pull: { followers: checkUserInDB } });
		const b = await userModel.updateOne({ userId: checkUserInDB }, { $pull: { following: followUserID } });
		return a, b
	}
	catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR };
	}
}

module.exports = {
	registerUser,
	saveLogInSessions,
	checkUserNameRecord,
	checkEmailInData,
	checkUserNameRecordForIndividual,
	fetchAllDataOfUsers,
	findUserDataWithToken,
	saveTokenForLogin,
	checkUserRecord,
	fetchUserRecord,
	searchAllData,
	updateUserRecord,
	deleteUserRecord,
	fetchUserId,
	updateFollowResponse,
	updateUnFollowResponse
};
