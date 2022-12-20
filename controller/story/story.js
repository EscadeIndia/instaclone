// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 07/09/2022
// *
// * Purpose			: User data accumulation Controller
// *
// * Revision History	:
// *
// * Date			Author			Jira			Functionality
// **********************************************************************

const crypto = require("../../utils/crypto.js");
const { logger } = require("../../utils/logger.js");
const { storyResponse, deleteStoryResponse} = require("../../services/user/user.js");



// const deleteStory = data ;
const fileUploadForStory = async (request, response) =>{
    try{
      uploadStory(request, response, async function (err) {
  
            // File Uplode For Story
      story = request.files.story;
      userName = request.body.userName;
      localStorage.setItem('storyUploadAddress', story[0].location);
      const  data = story[0].path
      const responseStory = await storyResponse ({story: data , userName : userName});
     // const deleteStory = await deleteStoryResponse ({story: data });
    //  const = deleteStory(request, response) async => {
    //  })
    //   deleteStory(request,response, async function (data)   {
    //   const deleteStory = await  deleteStoryResponse ({story: data })setTimeout(deleteStory, 10000);
    //   console.log("deleteStory" , deleteStory);
    // })
    //   setTimeout(deleteStory, 10000);  
   // const deleteStory = await  deleteStoryResponse ({story: data }).setTimeout(10000);
     
      // return new date and time
      let dateTime= new Date();
  
      // returns the current local time
      let time = dateTime.toLocaleTimeString(); 
  
    // const test = async (request,response , time , data) =>{
    //   console.log("dataControlerFirst", time )
    //   const deleteStory = await deleteStoryResponse({story: data });
    //   console.log("dataControler", deleteStory )
    // }
   async function test (data ) {
    const deleteStory = await deleteStoryResponse({story: data });
    }
    setTimeout(test, 30000,  data ); 
    //  
  
      return response.status(HTTP_STATUS_CODE.OK).json(successResponse(responseStory));
      // if (!responseStory.isSuccess) {
      //   return response
      //   .status(HTTP_STATUS_CODE.NOT_FOUND)
      //   .json(errorResponse(ERROR_MESSAGE.USER_STORY));
          // }
      // else {
          // 	return response
          // 		.status(HTTP_STATUS_CODE.OK)
          // 		.json(successResponse(responseStory))
          // }
  
    })}catch(err){
      return "error"
    }
  }



  module.exports = {

    fileUploadForStory,

};