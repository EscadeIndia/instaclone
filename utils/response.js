/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			   : Ashutosh Chaturvedi
 *
 * Date created		   : 24/11/2021
 *
 * Purpose			   : API Success and Error Response Function
 *
 * Revision History	   :
 *
 * Date			    Author			     Jira  			   Functionality
 *
 *********************************************************************
 */

const { logger } = require("../utils/logger.js");

/** Error Response Function
 *
 * @param message - Error Response Message
 */
const errorResponse = (message) => {
	logger.error(message);
	return { status: "error", message: message };
};
/** Success Response Function
 *
 * @param message -   Success Response Message
 * @param data    -   Success Response Data
 */
const successResponse = (message, data) => {
	return { status: "success", message: message, data: data };
};

const errorHandler = (error, response) => {
	logger.error(JSON.stringify(error));
	let code = error.toString().match(/\d+/);
	let errorString;
	if (code == null) {
		code = 500;
		errorString = error.toString();
	} else {
		code = code[0];
		errorString = error.toString().split(":");
		errorString.splice(0, 1);
		errorString.splice(1, 1);
		errorString = errorString.join(":");
	}
	code = code.toString();
	if (code == 0) code = 500;
	response.status(code).json(errorResponse(errorString));
};

module.exports = {
	errorResponse,
	successResponse,
	errorHandler,
};
