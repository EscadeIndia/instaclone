// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 07/09/2022
// *
// * Purpose			: User related Routes
// *
// * Revision History	:
// *
// * Date  		    	Author		      Jira      		  Functionality
// **********************************************************************//

const express = require('express');
const router = express.Router();
const userControllers = require('../../controller/story/story');




router.post('/story', userControllers.fileUploadForStory);






module.exports = router;
