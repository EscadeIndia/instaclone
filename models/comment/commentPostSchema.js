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

const commentPostSchema = mongoose.Schema(
    {
        userId: {
            type: Number
        },
        postId: {
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

const commentPostModel = mongoose.model('commentPostdbs', commentPostSchema);
module.exports = commentPostModel;
