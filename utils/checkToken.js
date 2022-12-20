const {
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	REQ_HEADER,
} = require('./constants.js');
const { createJwe, createJws, decryptJwe, verifyJws } = require('./jsonToken.js');
const { successResponse, errorResponse, errorHandler } = require('./response.js');
const { fetchAdmin_userId } = require('../services/admin/admin')

const checkeToken = async (request, response, next) => {

	try {
		const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
		// Verify Token
		const verifiedToken = await verifyJws(token);
		if (!verifiedToken.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
		}
		const decryptedData = await decryptJwe(verifiedToken.data);
	
	
		const result = await fetchAdmin_userId(decryptedData.data.userId)

		return { isSuccess: true, result_data: result.data }
	} catch (err) {
		return { isSuccess: false }
	}
}



module.exports = {
	checkeToken
}