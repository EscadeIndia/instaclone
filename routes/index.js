// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 07/09/2022
// *
// * Purpose			: Index Routes
// *
// * Revision History	:
// *
// * Date		    	Author		   Jira		  Functionality
// *
// **********************************************************************//

const express = require('express')
const app = express()
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 9000;


// const userChatRoomControllers = require('../controller/chat/chatRoom');


// app.get('/chatRoom', userChatRoomControllers.chatController);

// app.get('/chatTest', async (req, res, ) => {
//     console.log("Test Working");
// try{  
//   await io.on('connection', (socket) => {
//         console.log("hey",socket.id);
//         socket.on('chat message', msg => {
//         //  io.emit('chat message', msg);
//         });
//       });

//     res.send ("test case pass")
// //   res.sendFile(__dirname + '/index.html');
//     }catch(err){
//         return ":error"
//     }
// });


// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });



// const chat = require("./user/chatRoom")

// app.use('/chat', chat)

const user = require('./user/user')
const story = require('./story/userStory')
const reel = require('./Reels/reel')
const post = require('./Post/post')
const comment = require('./comment/comment')

//app.use('/admin', admin)
app.use('/user', user)
app.use('/story', story)
app.use('/reel', reel)
app.use('/post', post)
app.use('/comments', comment)



module.exports = app
