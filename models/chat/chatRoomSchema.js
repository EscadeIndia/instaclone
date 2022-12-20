/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      : Ashutosh Chaturvedi
 *
 * Date created		      : 07/09/2022
 *
 * Purpose			      : User data model
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 *
 *********************************************************************
 */

 const mongoose = require('mongoose');
 const uuid = require('uuid');

 const chatRoomSchema = mongoose.Schema(
     {  
    // userId: 
	// 		{
	// 			type: mongoose.Schema.Types.Number,
	// 			ref: 'userdbs'
            
	// 		},

            _id: {
                type: String,
                default: () => uuid.v4().replace(/\-/g, ""),
              },
            userNameS : {
                type: Array,
            },       
		
    messageText : {
        type: String,
    },
    chatId : {
        type: String,
    },

     },
     { timestamps: true }
 );
 
 const chatRoomModel = mongoose.model('chatRoomdbs', chatRoomSchema);
 module.exports = chatRoomModel;
 