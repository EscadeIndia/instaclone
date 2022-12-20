// **********************************************************************
// * Changelog
// * All notable changes to this project will be documented in this file.
// **********************************************************************
// *
// * Author				: Ashutosh Chaturvedi
// *
// * Date created		: 24/11/2021
// *
// * Purpose			: Constants
// *
// * Revision History	:
// *
// * Date			Author			Jira			Functionality
// **********************************************************************

// ERROR MESSAGE CONSTANTS
const ERROR_MESSAGE = {
	FETCHING_USER_ERROR: "Error in USER record fetch",
	USER_ID_NOT_EXIST: 'Entered User ID does not exist',
	COMMENT_NOT_FOUND: 'Comment Not Found',
	ERROR_IN_LIKE: 'Error In LIKE',
	ERROR_IN_POINTS: 'Error In Points',
	ERROR_IN_UNLIKE: 'Error In UNLIKE',
	FETCHING_USER_ERROR: "Error in User record fetch",
	TEXT_SEARCH_NOT_EXIST: 'Entered Text does not exist',
	ERROR_UPDATE_IN_REEL: 'ERROR updating In Reel Information!',
	ERROR_UPDATE_IN_POST: 'ERROR updating In Post Information!',
	USER_NOT_FOUND: 'User Not Found',
	USER_POST_NOT_FOUND: 'User Post Not Found',
	REELS_ARE_NOT_AVAILABLE : 'Reels are not in Data Base',
	POST_ARE_NOT_AVAILABLE : 'Post are not in Data Base',
	FETCHING_USER_ERROR: "Error in user record fetch",
	REEL_ID_NOT_EXIST: 'Entered Reel ID does not exist',
	COMMENT_ID_NOT_EXIST: 'Entered Comment ID does not exist',
	POST_ID_NOT_EXIST: 'Entered Post ID does not exist',
	USER_NAME_ALREADY_EXISTS : 'User Name Already Exists',
	USER_DOES_NOT_EXIST : 'User Does Not Exists Please Register First',
	EMAIL_NUMBER_ALREADY_EXISTS : 'Email or Number Already Exists Please Change your Email or Number',
	USER_ARE_NOT_AVAILABLE : 'Users are not in Data Base',
	USER_STORY : 'Story Upload Error',
	TOKEN_NOT_FOUND: 'Token Not Found',
	POPUP_PRIORITY_ERROR:'Priority should be between 1 to 3',
	NOTICE_ID_UPDATE_ERROR: 'Could not update notice id',
	FAQ_ID_UPDATE_ERROR: 'Could not update FAQ id',
	SUPPLIER_ID_UPDATE_ERROR: 'Could not update Supplier id',
	INPUT_ERROR: 'Please choose Atlest One Service',
	PDF_ERROR: 'Please Upload only PDF Files',
	FILE_ERROR: 'Please Upload Valid Files',
	PRESS_ID_UPDATE_ERROR: 'Could not update press id',
	POPUP_ID_UPDATE_ERROR: 'Could not update popup id',
	QUESTION_ID_UPDATE_ERROR: 'Could not update question id',
	NOTICE_NOT_EXIST: 'Notice does not exist',
	FAQ_NOT_EXIST: 'FAQ does not exist',
	NOTICE_NOT_EXIST: 'Notice does not exist',
	POPUP_NOT_EXIST: 'POP UP does not exist',
	PRESS_NOT_EXIST: 'Press Release does not exist',
	QUESTION_NOT_EXIST: 'Question does not exist',
	SUPPLIER_NOT_EXIST: 'Supplier does not exist',
	ERROR_UPDATE_QUESTIONID: 'ERROR updating Question ID into user record',
	ERROR_UPDATE_NOTICEID: 'ERROR updating Notice ID into admin record',
	ERROR_UPDATE_FAQID: 'ERROR updating FAQ ID into admin record',
	ERROR_UPDATE_SUPPLIER_ID: 'ERROR updating Supplier ID into admin record',
	ERROR_UPDATE_PRESSID: 'ERROR updating Press Release ID into admin record',
	ERROR_FETCHING_NOTICE_ID: 'Error fetching admin notice ids',
	ERROR_FETCHING_PRESS_ID: 'Error fetching admin Press Release ids',
	QUESTION_NOT_EXIST: 'Question does not exist',
	ALREADY_EXIST: 'Record already exists',
	NOT_EXIST: 'Phone number does not exist / Card information already exist',
	USERNAME_PASSWORD_INCORRECT: 'Username or Password is Incorrect',
	CONTACT_PASSWORD_INCORRECT: 'Contact or Password is Incorrect',
	INVALID_TOKEN: 'Invalid Token',
	INVALID_INPUT: 'Invalid Input format',
	REQUIRE_TOKEN: 'Required Token',
	REQUIRED_PARAMETERS_MISSING: 'REQUIRED API REQUEST PARAMETERS ARE MISSING',
	INTERNAL_SERVER: 'Internal server error',
	DB_CONNECTION: 'Failed to connect to DB on startup: ',
	ID_INSERT_FAIL: 'Error in inserting identity record',
	FETCHING_ID_FAIL: 'Error in fetching identity',
	AMOUNT_DID_TOKEN_CALLER_MISSING: 'Amount or ReceiveDID or Token or Caller not Exist!',
	INVALID_URL: 'Invalid URL',
	TRANSACTION_FAILED_AGAINST: 'Transaction has been failed against ',
	PAYMENT_DONE_MINTING_FAILED: 'Payment Done but Minting Token Failed against',
	MINTING_FAILED_TRANSACTIONID: 'Minting Failed against TransactionId ',
	TRY_MANUALLY: ' Try Manually!',
	ERROR_UPDATE_USERINFO: 'ERROR updating User Information!',
	ERROR_UPDATE_LICENSE: 'ERROR updating User Driving License!',
	ERROR_UPDATE_TRANSACTION: 'ERROR updating Transaction!',
	ERROR_FETCHING_TRANSACTION: 'ERROR Fetching Transaction!',
	ERROR_FETCHING_TRANSACTIONS: 'ERROR Fetching Transactions!',
	SAVE_TRANSACTION_DB_FAILED: 'Save Transaction in DB Failed!',
	PG_DB_CONNECTION_ERROR: 'PG DB Connection Error!',
	UNABLE_TO_MAKE_CALL: 'Unable to make call!',
	UNABLE_TO_MAKE_PAYMENT: 'Unable to make payment',
	INTERNAL_SERVER_ERROR: 'Internal Server Error',
	FAILED_CARD_VERIFICATION: 'Failed Card Verification',
	FAILED_FETCHING_PAYMENT_HISTORY: 'Failed fetching payment history',
	FAILED_FETCH_BALANCE: 'Failed fetch balance',
	FAILED_USER_DID_CREATION: 'Failed user DID creation',
	TRANSFER_TOKEN_FAILED: 'Transfer token failed',
	LOGIN_MIDDLELAYER_FAILED: 'Login_Middlelayer_Failed',
	LOGIN_FAILED: 'User successfully registered on E3DA/MID-DID,wait for sometime',
	LOGIN_AGAIN:"Please login",
	PHONE_NUMBER_NOT_EXIST: 'Entered User ID does not exist',
	FETCH_CARD_DETAILS: 'Failed to fetch card details',
	FETCH_PAYMENT_DETAILS: 'Failed to fetch payment hisory details',
	REGISTERING_PAYMENT_CARD: 'Failed to register card',
	GET_PAYMENT_CARD: 'Get payment card failed',
	GET_PAYMENT_HISTORY: 'Get payment hisory failed',
	DECRYPTION_FAILED: 'Failed to decrypt string',
	CHECKING_ADMIN_ERROR: "Admin record does not exists",
	CHECKING_ADMIN_NOTICE_ERROR: "Admin notice record does not exists",
	CHECKING_ADMIN_FAQ_ERROR: "Admin FAQ record does not exists",
	CHECKING_ADMIN_PRESS_ERROR: "Admin Press Release record does not exists",
	FETCHING_ADMIN_ERROR: "Error in admin record fetch",
	FETCHING_OPERATOR_ERROR: "Error in Operator record fetch",
	FETCHING_USER_ERROR: "Error in user record fetch",
	FETCHING_QUESTION_ERROR: "Error in questions record fetch",
	FETCHING_SUPPLIER_NAME_ERROR: "Error in supplier name record fetch",
	FETCHING_SUPPLIER_ERROR: "Error in supplier all record fetch",
	ADMIN_NOT_EXISTS: "Admin does not exist",
	OPERATOR_NOT_EXISTS: "Operator does not exist",
	MODIFIER_NOT_EXISTS: "Modifier does not exist",
	RESPONDENT_NOT_EXISTS: "Respondent does not exist",
	WRITER_NOT_EXISTS: "Writer does not exist",
	USER_NOT_EXISTS: "User does not exist",
	WRITER_NAME_NOT_MATCH: "Writer does not match with existing name",
	RESPONDENT_NAME_NOT_MATCH: "Respondent name does not match with existing name",
	ERROR_UPDATE_ADMININFO: 'ERROR updating Admin Information!',
	ERROR_UPDATE_OPERATOR_INFO: 'ERROR updating Operator Information!',
	ERROR_FETCHING_SUPPLIER_ID: 'Error fetching admin supplier ids',
	INVALID_INPUT: 'Invalid email id',
	TOKEN_FAILED: 'Token creation failed',
	ERROR_ADD_QUESTION: 'ERROR adding answer for question',
	ERROR_UPDATE_NOTICE: 'ERROR in updating notice',
	ERROR_UPDATE_FAQ: 'ERROR in updating FAQ',
	ERROR_UPDATE_PRESS: 'ERROR in updating press release',
	INVALID_INPUT: 'Invalid email id',
	FAQID_NOT_EXIST: "FAQId is not exist",
	TITLE_NOT_EXIST: "Title is not exist",
	POPUPID_NOT_EXIST: "POPUP ID not exist",
	ID_NOT_EXIST: "ID is not exist",
	SUPPLIER_ALREADY_EXIST: 'Supplier Already exist',
	SUPPLIER_NAME_NOT_EXIST: 'Entered supplier name does not exist',
	ERROR_UPDATE_SUPPLIER: 'ERROR in updating supplier',
	ERROR_UPDATE_SUPPLIER_SETTLEMENT: 'ERROR in updating supplier settlement',
	SUPPLIER_EXISTS_ERROR: "Supplier already exist ",
	ORDER_NUMBER_NOT_EXIST: 'Order Number does not exist',
	TOP_FIX_LIMIT: "Top fix count limit reached",
  NO_RELEVANT_DATA:"no relevant data",
  FAILED_SUPPLIER_CREATION:"Failed to create new Supplier",
	FAILED_SUPPLIER_UPDATE:"Failed to update Supplier",
	FAILED_FETCH_SUPPLIER_NAME:"Failed to fetch Supplier Name",
	FAILED_FETCH_SUPPLIER_LIST:"Failed to fetch Supplier List",
	FAILED_FETCH_SUPPLIER_DETAIL:"Failed to fetch Supplier Detail",
	INVALID_PAGE:'Invalid Page',
	ERROR_UPDATE_SUPPLIER_INFO: 'ERROR updating Supplier Information!',
	INVALID_FILE:"Not a pdf. Only pdf can be uploaded.",
	NO_PERMISSION_TO_ACCESS:"YOU HAVE NOT PERMISSION TO ACCESS"
};

// SUCCESS MESSAGE CONSTANTS
const SUCCESS_MESSAGE = {
	USER: "User logged in successfully",
	LIKE_POST_RECORD: "Like Post successfully",
	UNLIKE_POST_RECORD: "Unlike Post successfully",
	LIKE_REEL_RECORD: "Like Reel successfully",
	LIKE_COMMENT_RECORD: "Like Comment successfully",
	UNLIKE_COMMENT_RECORD: "Unlike Comment successfully",
	UNLIKE_REEL_RECORD: "Unlike Reel successfully",
	DELETE_USER_RECORD: "Delete User record successfully",
	DELETE_REEL_RECORD: "Delete Reel record successfully",
	DELETE_POST_RECORD: "Delete POst record successfully",
	USER_AVAILABLE: 'User Name is Available ',
	USERS_ARE_AVAILABLE: 'Users are Available ',
	PAYMENT_CAPTURED: 'Payment captured',
	PAYMENT_FETCHED: 'Payment fetched',
	PAYMENT_INITIATED: 'Payment initiated',
	PAYMENT_VERIFIED: 'Payment verified',
	CARD_VERIFIED: 'Card Verified',
	PROCEED_WITH_VIRTUAL_ACCOUNT: 'Proceed with virtual account ',
	MONGO_CONNECTION_SUCCESS: 'Mongo Connection Succeeded.',
	LOGIN: "User logged in successfully",
	OPERATOR_LOGIN: "Operator logged in successfully",
	PASSWORD_UPDATE: "Password has been updated successfully",
	RECORD_CHECKED: "User record checked successfully.",
	RECORD_FETCHED: "User record fetched successfully.",
	RECORD_UPDATED: "User record updated successfully.",
	RECORD_SAVED: "User record saved successfully.",
	DB_CONNECTION_SUCCESS: "MongoDB connection established successfully.",
	RANDOM_KEY_GENERATION: "Random key generated successfully.",
	JWE_CREATED: "JWE created successfully.",
	SUCCESS: "success",
	RECOVERY_KEY_GENERATED: "Recovery key generated successfully.",
	ACCOUNT_RECOVERED: "Account recovered successfully.",
	NEW_PASSWORD_SET: "New password has been set!",
	ORG_RECORD_SAVED: "Organization record saved successfully.",
	ORG_RECORD_CHECKED: "Organization record checked successfully.",
	CARD_DETAILS_ADDED: "Card Details added successfully",
	ADMIN_RECORD_CHECKED: "Admin record checked successfully",
	ADMIN: "Admin logged in successfully",
	OPERATOR: "Operator logged in successfully",
	NOTICE_RECORD_CHECKED: "Admin notice record checked successfully",
	FAQ_RECORD_CHECKED: "Admin FAQ record checked successfully",
	DELETE_FAQ_RECORD: "Delete FAQ record successfully",
	DELETE_OPERATOR_RECORD: "Delete Operator record successfully",
	DELETE_NOTICE_RECORD: "Delete notice record successfully",
	DELETE_PRESS_RECORD: "Delete press-release record successfully",
	DELETE_POPUP_RECORD: "Delete popup record successfully",
	PRESS_RECORD_CHECKED: "Admin press release record checked successfully",
};

// WARNING MESSAGE CONSTANT
const WARN_MESSAGE = {
	DB_CONNECTION_TERMINATED: "Mongoose default connection to DB Terminated.",
	EMPTY_BODY: "Empty body!",
};

// HTTP STATUS CODES
const HTTP_STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOW: 405,
	CONFLICT: 409,
	INTERNAL_SERVER: 500,
};

// CURRENCY CODES
const PAYMENTS = {
	CURRENCY: 'USD',
};

// PAYMENT STATUS MESSAGES
const PAYMENTS_STATUS = {
	CREATED: 'CREATED',
	APPROVED: 'APPROVED',
	COMPLETED: 'COMPLETED',
};

const MESSAGES = {
	AFTER_PAYMENT_PROCEED: 'After Payment, Proceed with txnId ',
	DID: ' & DID ',
};

// CONSTANTS
const SUCCESS = "successfully executed";

// HEADERS
const REQ_HEADER = {
	X_AUTH_TOKEN: "x-auth-token",
	CONTENT_TYPE: "Content-Type",
	CONTENT_LENGTH: "Content-Length",
	APPLICATION_JSON: "application/json",
};

// CRYPTO PARAMETERS
const CRYPTO_PARAMETER = {
	ALGO_SHA: "sha256",
	BASE_VALUE: "base64",
	HEX: "hex",
	UTF: "utf-8",
	ALGO_AES: "aes",
};


// EXPORT MODULE
module.exports = {
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	PAYMENTS,
	PAYMENTS_STATUS,
	MESSAGES,
	SUCCESS,
	REQ_HEADER,
	CRYPTO_PARAMETER,
	WARN_MESSAGE
};
