/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author            : Ashutosh Chaturvedi
 *
 * Date created      : 15/12/2021
 *
 * Purpose           : Crypto utilitites
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality
 * 
 **********************************************************************
 */

const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const logger = require("../utils/logger.js");
const { CRYPTO_PARAMETER, ERROR_MESSAGE, SUCCESS_MESSAGE } = require("./constants.js");

/**
 * Encrypt Text
 * @param {string} text - Text to be Encrypted
 * @param {string} secretKey - Secret Key used for Encryption
 * @returns {object}
 */
const encrypt = async (text, secretKey) => {
	let key = crypto
		.createHash(CRYPTO_PARAMETER.ALGO_SHA)
		.update(String(secretKey))
		.digest(CRYPTO_PARAMETER.BASE_VALUE)
		.substr(0, 32);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString(CRYPTO_PARAMETER.HEX),
		content: encrypted.toString(CRYPTO_PARAMETER.HEX),
	};
};

/**
 * Decrypt Text
 * @param {string} hash - hash to be decrypted
 * @param {string} secretKey - Secret Key used for Decryption
 * @returns {string}
 */
const decrypt = async (hash, secretKey) => {
		let key = crypto
			.createHash(CRYPTO_PARAMETER.ALGO_SHA)
			.update(String(secretKey))
			.digest(CRYPTO_PARAMETER.BASE_VALUE)
			.substr(0, 32);
		const decipher = crypto.createDecipheriv(
			algorithm,
			key,
			Buffer.from(hash.iv, CRYPTO_PARAMETER.HEX)
		);
		const decrpyted = Buffer.concat([
			decipher.update(Buffer.from(hash.content, CRYPTO_PARAMETER.HEX)),
			decipher.final(),
		]);

		return decrpyted.toString();
};

/**
 * Create Hash Value of Input
 * @param {string} text -  Text to Hash
 * @returns {string}
 */
const createHash = (text) => {
	const hash = crypto
		.createHash(CRYPTO_PARAMETER.ALGO_SHA)
		.update(text, CRYPTO_PARAMETER.UTF)
		.digest(CRYPTO_PARAMETER.HEX);
	return hash;
};

/**
 * Create random secret key of the given length
 */
const generateRandomKey = async () => {
	return new Promise((resolve, reject) => {
		crypto.generateKey(CRYPTO_PARAMETER.ALGO_AES, { length: 128 }, (err, key) => {
			if (err) {
				logger.error(ERROR_MESSAGE.RANDOM_KEY_GENERATION_ERR + err);
				reject({ isSuccess: false, data: err });
			}
			logger.info(SUCCESS_MESSAGE.RANDOM_KEY_GENERATION);
			resolve({ isSuccess: true, data: key.export().toString(CRYPTO_PARAMETER.HEX) });
		});
	});
};
module.exports = {
	encrypt,
	decrypt,
	createHash,
	generateRandomKey
}
