/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      : Ashutosh Chaturvedi
 *
 * Date created		      : 07/09/2022
 *
 * Purpose			      : LogIn Session data model
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 *
 *********************************************************************
 */

const mongoose = require('mongoose');


const loginSessionSchema = mongoose.Schema(
    {
        source: {
            type: String,
        },
        ip: {
            type: String,
        },

        deviceID: {
            type: String,
        },
        location: {
            type: String,
        },
        status: {
            type: String,
        },
        emailOrPhoneNumber: {
            type: String,
        }
    },
    { timestamps: true }
);

const loginsessionModel = mongoose.model('loginSessiondbs', loginSessionSchema);
module.exports = loginsessionModel;
