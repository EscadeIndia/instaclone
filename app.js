
// // **********************************************************************
// // * Changelog
// // * All notable changes to this project will be documented in this file.
// // **********************************************************************
// // *
// // * Author				  : Ashutosh Chaturvedi
// // *
// // * Date created		  :05/11/2022
// // *
// // * Purpose			  : User Data Accumulation
// // *
// // * Revision History	  : 
// // *
// // * Date		    	Author		   	Jira			Functionality
// // **********************************************************************//

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const indexRouter = require('./routes/index.js');
const chatRouter = require('./routes/user/chatRoute.js');
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/user/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./routes/user/passport");
require('dotenv').config()
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);


// MongoDB connection
MONGO_CONNECTION = 'mongodb://localhost:27017/instaClonedbs',
mongoose.connect(MONGO_CONNECTION ,{
	useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
});
mongoose.connection.on("connected", ()=>{
    console.log("DataBase is Connected")
})

// Parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use('/', indexRouter); 

// io.on("connection", (socket) => {
// socket.on("connected" , msg)
//   console.log("chat connect on 1143 port")
// });
//app.use("/chat", chatRouter);
// io.on('connection', (socket) => {
// 	socket.on('chat message', msg => {
// 	  io.emit('chat message', msg);
// 	});
//   });
//port = 1143;
  PORT = 1143;
//   httpServer.listen(port, () => {
// 	console.log(`Socket.IO server running at http://localhost:${port}/`);
//   });


//httpServer.listen(port);



app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})