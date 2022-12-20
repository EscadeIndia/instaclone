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
const userControllers = require('../../controller/user/user');


router.post('/register', userControllers.registerUserA);

router.get('/check', userControllers.checkUserNameAvivalibity);

router.get('/fetchUsers', userControllers.fetchAllUsers);

router.get('/fetchWithToken', userControllers.fetchUsersWithToken);

router.post('/loginWithGoogle', userControllers.loginWithGoogle);

router.post('/login', userControllers.login);

router.get('/fetchUser', userControllers.fetchUser);

router.get('/search', userControllers.search);

router.put('/updateUser', userControllers.updateUser);

router.put('/updateProfilePicture', userControllers.updateProfilePicture);

router.delete('/deleteUser', userControllers.deleteUser);

router.put('/follow', userControllers.follow);

router.put('/unfollow', userControllers.unfollow);
//router.post('/upload', userControllers.uplodeVideo);


module.exports = router;
