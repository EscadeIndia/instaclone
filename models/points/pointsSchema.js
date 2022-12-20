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

 const pointsSchema = mongoose.Schema(
     {
         userId: {
             type: Number
         },
         source: {
             type: String,
         },
         points: {
             type: Number,
         }
     },
     { timestamps: true }
 );
 
 const pointsModel = mongoose.model('pointsdbs', pointsSchema);
 module.exports = pointsModel;
 