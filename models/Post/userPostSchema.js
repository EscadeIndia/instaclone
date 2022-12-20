/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      : Ashutosh Chaturvedi
 *
 * Date created		      : 09/12/2022
 *
 * Purpose			      : User Post model
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 *
 *********************************************************************
 */

 const mongoose = require('mongoose');

 const userPostSchema = mongoose.Schema(
    {      userId: {
        type:Number
     },
    postImageVideo : {
        type: [String],
    },
    language: {
        type: String,
    },
    hashTag: {
             type: String,
           //  required: true,
         },
         commenting: {
             type: Boolean,
         },
         shareing: {
            type: Boolean,
        },
         status: {
             type: Boolean
         },
         title: {
             type: String,
         },
        caption: {
            type: String,
        },
        likes: {
            type: String,
        },
        comments: {
            type: String,
        },
        share: {
            type: String,
        }
     },
     { timestamps: true }
 );

 const userPostModel = mongoose.model('userPostdbs', userPostSchema);
 module.exports = userPostModel;
 