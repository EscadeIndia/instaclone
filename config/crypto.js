/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author			      :
 *
 * Date created		      : 
 *
 * Purpose			      : Contains the crypto config
 *
 * Revision History	:
 *
 * Date			    Author			 Jira			   Functionality
 * 
 *********************************************************************
 */

module.exports = {
	ALGORITHM: 'aes-192-cbc',
	SALT: 'salt',
	KEY_LENGHT: 24,
	ENCRYPT_INPUT_ENCODE: 'utf-8',
	ENCRYPT_OUTPUT_ENCODE: 'hex',
	DECRYPT_INPUT_ENCODE: 'hex',
	DECRYPT_OUTPUT_ENCODE: 'utf-8',
};
