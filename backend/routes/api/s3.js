const express = require('express');
const router = express.Router();
const multer = require('multer')
const AWS = require('aws-sdk');
const fs = require('fs');
const AWSkeys = require('../../keys')
const path = require('path')

// Tell multer where to store the file temporarily,
// as well as change the filename to a unique name with a date
const storage = multer.diskStorage({
	destination: "./uploads",
	filename: function (req, file, cb) {
		cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

// Tells aws-sdk what credentials to use
AWS.config.update({
  accessKeyId: AWSkeys.iam_access_id,
  secretAccessKey: AWSkeys.iam_secret,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

//POST method route for uploading file
router.post('/post_file', upload.single("img"), function (req, res) {

  // Multer grabs the photo and adds it to the request
  // Local copy is stored in ./uploads until upload is successful
  uploadFile(req.file.path, req.file.filename ,res);

})



// Where the upload happens
function uploadFile(source,targetName,res){

    fs.readFile(source, function (err, filedata) {
      if (!err) {
        const putParams = {
            Bucket      : 'the-pass',
            Key         : targetName,
            Body        : filedata
        };
        s3.putObject(putParams, function(err, data){
          if (err) {
            console.log('File not uploaded. Error :',err);
            return res.send({success:false});
          }
          else{
            // deleted file from uploads folder
            fs.unlinkSync(source);
            // Return new filename for further processing
            return res.json(targetName);
          }
        });
      }
      else{
        console.log({'Error': err});
      }
    });
  }



module.exports = router;
