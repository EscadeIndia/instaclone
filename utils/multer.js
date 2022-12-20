const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const s3config = require("../config/config.json")

const uploadTest = multer();


const pdfFilter = (req, file, cb) => {
	if (file.mimetype=="application/pdf") {
		cb(null, true);
  } else {
		req.invalidFormat = true
    cb(null, false);
  }
};

const noticeFilter = (req, file,cb)=>{
	const possible = ["pdf","jpg","jpeg","png"];
	const mime = file.mimetype.split('/')[1];
	if(possible.indexOf(mime)>-1){
		cb(null, true);
	}else{
		req.invalidFormat = true
    cb(null, false);
	}
}




const s3 = new aws.S3({
	accessKeyId: s3config.awsSecretId,
	secretAccessKey: s3config.awsSecretKey,
	Bucket: s3config.awsSecretKey,
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: s3config.bucketName,
		acl: 'public-read',
		metadata: function (request, files, cb) {
			cb(null, { fieldName: files.fieldname });
		},
		key: function (request, file, cb) {
			const ext = file.originalname.split('.');
			cb(null, Date.now() + '.' + ext[1]);
		},
	}),
	fileFilter: pdfFilter
})

const uploadNotice = multer({
	storage: multerS3({
		s3: s3,
		bucket: s3config.bucketName,
		acl: 'public-read',
		metadata: function (request, files, cb) {

			cb(null, { fieldName: files.fieldname });
		},
		key: function (request, file, cb) {
			const ext = file.originalname.split('.');
			cb(null, Date.now() + '.' + ext[1]);
		},
	}),
	fileFilter: noticeFilter
})



module.exports = {
	upload,
	uploadNotice,
	uploadTest
}
