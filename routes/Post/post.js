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
const userPostControllers = require('../../controller/Post/post');




router.post('/post', userPostControllers.uploadPost);

router.get('/allPosts', userPostControllers.fetchAllPost);

router.get('/userPosts', userPostControllers.fetchPostForSingleUser);

router.put('/updatePost', userPostControllers.updatePost);

router.delete('/deletePost', userPostControllers.deletePost);

router.get('/searchPost', userPostControllers.searchPost);

//likePost
router.put('/likePost', userPostControllers.likePost);

module.exports = router;
