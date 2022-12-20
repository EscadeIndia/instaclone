/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author            : Ashurosh Chaturvedi 
 *
 * Date created      : 
 *
 * Purpose           : Contains JWK config
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality
 * 
 **********************************************************************
 */

 const JWKCONFIG = {
	Secret_Key: "om_namo_narayan",
	exportedJwk: {
		kty: "oct",
		kid: "6bDRV_JGMqFHuzPVF9OvoorYMJhwAGNsdcJ40nNLZbw",
		alg: "A256GCM",
		k: "XCY9_Kfd67kPpVeODJe2GULFwHiqjrHQN483zCeW7jU",
	},
};

module.exports = { JWKCONFIG}
