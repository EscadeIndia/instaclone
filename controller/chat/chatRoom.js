const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { userInfo } = require('os');
const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    HTTP_STATUS_CODE,
    REQ_HEADER,
  } = require("../../utils/constants.js");
  const {
    successResponse,
    errorResponse,
    errorHandler,
  } = require("../../utils/response.js");
  const {
    createChat,
    registerUser,
    checkUserNameRecord,
    checkEmailInData,
    fetchAllDataOfUsers,
    findUserDataWithToken,
    checkUserNameRecordForIndividual,
    storyResponse,
    deleteStoryResponse,
    saveTokenForLogin,
    checkUserRecord,
    fetchUserRecord,
    updateUserRecord,
  } = require("../../services/chat/chatRoom.js");

const chatController = async(request, response)  =>{
     console.log('test');
   try{
    let userNameS = []
     userNameS = request.body.userNameS;
   //const messageText = request.query.messageText;
   console.log("test case pass in controller", userNameS);
   const { userName: chatId } = request;
   const allUserNameS = [...userNameS, chatId];
   console.log("controller", allUserNameS)
   const chatRoom = await createChat(allUserNameS, chatId);
   console.log("test case pass in controller Chate room", chatRoom);

  //  io.on('connection',function (socket)  {
  //   console.log("User Joined");
  //   // socket.on('chat message', msg => {
  //   //     console.log(socket.id);
  //   //  // io.emit('chat message', msg);
  //   // });
  // });

  // server-side
//   io.on("connection", (socket) => {
//     console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
//     io.emit("message", "hi!");
//   });
  
  // client-side
//   socket.on("connect", () => {
//     console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
//     socket.emit("message", "hi!");
//   });
return response
				.status(HTTP_STATUS_CODE.OK)
				.json(successResponse("Hey",chatRoom))

 }
catch(err){
    return "error"
}

}
module.exports = {
    chatController
}