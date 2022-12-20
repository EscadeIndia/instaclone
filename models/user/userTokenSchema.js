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

 const userTokenSchema = mongoose.Schema(
     {  
    userId: 
			{
				type: mongoose.Schema.Types.Number,
				ref: 'userdbs',
            
			},
		
    emailOrNumber : {
        type: String,
    },
    tokenForRegistration: {
            type: String,
        },
        tokenForLogin: {
            type: String,
        },

     },
     { timestamps: true }
 );
 
 const userTokenModel = mongoose.model('userTokendbs', userTokenSchema);
 module.exports = userTokenModel;
 