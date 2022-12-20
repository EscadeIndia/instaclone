/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      : Ashutosh Chaturvedi
 *
 * Date created		      : 09/12/2022
 *
 * Purpose			      : User Reel model
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 *
 *********************************************************************
 */

 const mongoose = require('mongoose');

 const userReelSchema = mongoose.Schema(
     {      userId: {
        type:Number
     },
    reelImageVideo : {
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
            type: Array,
        },
        comments: {
            type: Array,
        },
        share: {
            type: String,
        }
     },
     { timestamps: true }
 );

 const userReelModel = mongoose.model('userReeldbs', userReelSchema);
 module.exports = userReelModel;
 