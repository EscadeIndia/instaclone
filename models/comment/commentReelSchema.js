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

const commentReelSchema = mongoose.Schema(
    {
        userId: {
            type: Number
        },
        reelId: {
            type: String,
        },
        currentUserId: {
            type: Number,
        },
        comments: {
            type: String,
        },
        likes: {
            type: Array,
        }
    },
    { timestamps: true }
);

const commentReelModel = mongoose.model('commentReeldbs', commentReelSchema);
module.exports = commentReelModel;
