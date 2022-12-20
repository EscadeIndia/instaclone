const chatRoomModel = require("../../models/chat/chatRoomSchema.js");
const userModel = require("../../models/user/userSchema.js");


  const createChat = async (userNameS, chatId )=>{
    try{
      console.log("userNameS",userNameS);
      console.log( "chatId", chatId)
        const availableRoom = await chatRoomModel.findOne({
            userNameS: {
              $size: userNameS.length,
              $all: [...userNameS],
            }
          });
          console.log("availableRoom",availableRoom)
          if (availableRoom) {
            return {
              isNew: false,
              message: 'retrieving an old chat room',
              chatId: availableRoom._doc._id,
            
            };
          }
      
          const newRoom = await this.create({ userNameS, chatId });
          console.log("newRoom", newRoom)
          return {
            isNew: true,
            message: 'creating a new chatroom',
            chatId: newRoom._doc._id
          };
    }catch(err){
        return "error"
    }
  }

  module.exports={
    createChat
  }