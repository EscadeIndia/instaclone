/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      : 
 *
 * Date created		      : 
 *
 * Purpose			      : Contains the crypto config
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 *
 *********************************************************************
 */

let DBCONFIG;
if (process.env.NODE_ENV === "production") {
	// $ npm run start:prod
	DBCONFIG = {
		MONGO_URI: "mongodb://localhost:27017/userdb",
	};
} else if (process.env.NODE_ENV === "localhost") {
	// $ npm run start:local
	DBCONFIG = {
		MONGO_URI: "mongodb://localhost:27017/userdb",
	};
} else if (process.env.NODE_ENV === "ehdcjf") {
	DBCONFIG = {
		//MONGO_URI: "mongodb://test.e-3da.com:27100/e3daDb",
		MONGO_URI: "mongodb://localhost:27017/userdb",
	};
} else {
	// for https://test.e-3da.com/api-docs/ <-> http://3.39.132.99:3000/api-docs/
	// $ npm run start:dev
	DBCONFIG = {
		//MONGO_URI: "mongodb://localhost:27100/e3daDb",
		 MONGO_URI: "mongodb://localhost:27017/userdb",
	};
}

module.exports = { DBCONFIG };
