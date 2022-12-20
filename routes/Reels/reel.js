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
const userReelControllers = require('../../controller/Reels/reels');




router.post('/reel', userReelControllers.uploadReels);

router.get('/allReels', userReelControllers.fetchAllReels);

router.get('/userReels', userReelControllers.fetchReelsForSingleUser);

router.put('/updateReel', userReelControllers.updateReel);

router.delete('/deleteReel', userReelControllers.deleteReel);

router.get('/searchReel', userReelControllers.searchReel);

router.put('/likeReel', userReelControllers.likeReel);

module.exports = router;
