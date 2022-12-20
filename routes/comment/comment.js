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

const { ResourceGroupsTaggingAPI } = require('aws-sdk');
const express = require('express');
const router = express.Router();
const reelCommentControllers = require('../../controller/comments/reelComment');
const postCommentControllers = require('../../controller/comments/postComment');




router.post('/reelcomments', reelCommentControllers.reelComment);

router.get('/fetchreelcomments', reelCommentControllers.fetchReelComments);

router.put('/updatereelcomment', reelCommentControllers.updateReelComment)

router.put('/likereelcomment', reelCommentControllers.likeReelComment)

router.delete('/deletereelcomment', reelCommentControllers.deleteReelComment)


router.post('/postcomments', postCommentControllers.postComment);

router.get('/fetchpostcomments', postCommentControllers.fetchPostComments);

router.put('/updatepostscomment', postCommentControllers.updatePostComment)

router.put('/likepostcomment', postCommentControllers.likePostComment)

router.delete('/deletepostcomment', postCommentControllers.deletePostComment)

// router.get('/allPosts', userPostControllers.fetchAllPost);

// router.get('/userPosts', userPostControllers.fetchPostForSingleUser);

// router.put('/updatePost', userPostControllers.updatePost);

// router.delete('/deletePost', userPostControllers.deletePost);

// router.get('/searchPost', userPostControllers.searchPost);

module.exports = router;
