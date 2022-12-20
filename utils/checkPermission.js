const { ERROR_MESSAGE, SUCCESS_MESSAGE, HTTP_STATUS_CODE, REQ_HEADER } = require("./constants.js");
const { createJwe, createJws, decryptJwe, verifyJws } = require("./jsonToken.js");
const { successResponse, errorResponse, errorHandler } = require("./response.js");
const { fetchAdmin_userId } = require("../services/admin/admin");

//menu는 접근 메뉴 한글명
//[회원관리,회원탈퇴, 결제내역, 정산내역, 공급사관리, 공급사정산,
// 세금계산서, 공지사항, 팝업관리, 보도자료, 문의사항, FAQ, 운영자관리, 권한그룹관리]
// type은 read-only는 r, read-write는 w
//
const checkPermission = (menu, type, supplier = false) => {
	return async function (req, res, next) {
		try {
			const token = req.header(REQ_HEADER.X_AUTH_TOKEN);
			// Verify Token
			const verifiedToken = verifyJws(token);
			if (!verifiedToken.isSuccess) {
				return res
					.status(HTTP_STATUS_CODE.UNAUTHORIZED)
					.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
			}
			const decryptedData = await decryptJwe(verifiedToken.data);

			if (!decryptedData.isSuccess) {
				return res
					.status(HTTP_STATUS_CODE.UNAUTHORIZED)
					.json(errorResponse(decryptedData.data));
			}

			const adminInfo = await fetchAdmin_userId(decryptedData.data.userId);
			if (!adminInfo.isSuccess) {
				return res
					.status(HTTP_STATUS_CODE.UNAUTHORIZED)
					.json(errorResponse(adminInfo.data.message));
			} else {
				const admin = adminInfo.data;
				const { role, menuId } = admin;
				// 수퍼관리자는 모두 통과
				// 공급사 관리자가 통과할 수 있다면 통과.
				if (role == "super" || (supplier && role == "supplier")) {
					req.adminInfo = admin;
					return next();
				}

				if (role == "normal") {
					if (type == "w") {
						for (let i = 0; i < menuId.length; i++) {
							const item = menuId[i];
							if (item.menuName == menu) {
								if (item.accessType == "w") {
									req.adminInfo = admin;
									return next();
								} else
									return res
										.status(HTTP_STATUS_CODE.UNAUTHORIZED)
										.json(errorResponse("NO PERMISSION TO ACCESS"));
							}
						}
					} else if (type == "r") {
						for (let i = 0; i < menuId.length; i++) {
							const item = menuId[i];
							if (item.menuName == menu) {
								if (item.accessType == "w" || item.accessType == "r") {
									req.adminInfo = admin;
									return next();
								} else
									return res
										.status(HTTP_STATUS_CODE.UNAUTHORIZED)
										.json(errorResponse("NO PERMISSION TO ACCESS"));
							}
						}
					}
				}
			}

			return res
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse("NO PERMISSION TO ACCESS"));
		} catch (err) {
			return res
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse("NO PERMISSION TO ACCESS"));
		}
	};
};


module.exports = { checkPermission };
