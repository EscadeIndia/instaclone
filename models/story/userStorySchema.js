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
 const userStorySchema = mongoose.Schema(
     {  
    userId: 
			{
				type: mongoose.Schema.Types.Number,
				ref: 'userdbs',
            
			},
		
    story : {
        type: String,
    },
    title : {
        type: String,
    },
    status : {
        type: Boolean,
    }
     },
     { timestamps: true }
 );
 

 const userStoryModel = mongoose.model('userStorydbs', userStorySchema);
 module.exports = userStoryModel;
 