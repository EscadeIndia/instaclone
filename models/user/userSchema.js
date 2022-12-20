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
 const autoIncrement = require('mongoose-auto-increment');

 const userSchema = mongoose.Schema(
     {  userId:{
        type: Number,
        required: true
       
     },
    userName : {
        type: String,
    },
    name: {
        type: String,
    },
    // emailOrNumber: {
    //          type: String,
    //        //  required: true,
    //      },
         password: {
             type: String,
         },
         email: {
             type: String,
         },
         number: {
            type: String,
        },
         dob: {
             type: String,
         },
         gender: {
             type: String,
         },
        dateTime: {
            type: Date,
        },
        status: {
            type: Boolean,
        },
        avtar: {
            type: String,
        },
        profilePicture: {
            type: [String],
        },
        bio: {
            type: String,
        },
        followers: {
            type: Array,
        },
        following: {
            type: Array,
        },
        points: {
            type: Array,
        },
        language: {
            type: String,
        },
        tokenAfterRegistration: {
            type: String,
        }, story:{
            type: String ,
        }
     },
     { timestamps: true }
 );
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
    model: 'userdbs',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});
 const userModel = mongoose.model('userdbs', userSchema);
 module.exports = userModel;
 