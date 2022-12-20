/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author            : Ashutosh Chaturvedi
 *
 * Date created      : 24/11/2021
 *
 * Purpose           : Logger utility
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality
 *
 **********************************************************************
 */

const winston = require("winston");
const LOGCONFIG = require("../config/log.js");

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({ format: LOGCONFIG.FILE_FORMAT }),
		winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new winston.transports.File({
			filename: LOGCONFIG.FILE,
			json: LOGCONFIG.ISJSON,
			maxsize: LOGCONFIG.FILE_SIZE,
			maxFiles: LOGCONFIG.MAX_FILES,
		}),
		new winston.transports.Console(),
	],
});


module.exports = {logger};
