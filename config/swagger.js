/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author            : Tushar Bansal
 *
 * Date created      : 27/12/2021
 *
 * Purpose           : Contains the Swagger config
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality
 *
 **********************************************************************
 */


let SWAGGER = {
    open_api_version: '3.0.3',
    title: 'E3DA API',
    version: '2.0.0',
    description: 'Controller for E3DA API Calls are defined here',
    apis: ['./routes/admin/*.js', './routes/user/*.js', './routes/platform/*.js'],
	};;

if (process.env.NODE_ENV === 'production') {
	SWAGGER.url ='https://www.e-3da.com';
} else if (process.env.NODE_ENV === 'localhost') {
    SWAGGER.url ='http://localhost:3000';
} else if(process.env.NODE_ENV === 'ehdcjf'){
    SWAGGER.url ='http://localhost:3000';
}else {
	SWAGGER.url ='https://test.e-3da.com';
}

module.exports = { SWAGGER };