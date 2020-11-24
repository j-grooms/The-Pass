const express = require('express');
const router = express.Router();
const multer = require('multer')
const AWS = require('aws-sdk');
const fs = require('fs');
const keys = require('../../keys')
const path = require('path')

const storage = multer.diskStorage({
	destination: "./uploads",
	filename: function (req, file, cb) {
		cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

AWS.config.update({
  accessKeyId: keys.iam_access_id,
  secretAccessKey: keys.iam_secret,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

//POST method route for uploading file
router.post('/post_file', upload.single("img"), function (req, res) {

  // Multer middleware adds file to request object.
  uploadFile(req.file.path, req.file.filename ,res);

})


router.get('/', (req, res) => {
  res.json('connected')
});



//The uploadFile function
function uploadFile(source,targetName,res){
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
      if (!err) {
        const putParams = {
            Bucket      : 'the-pass',
            Key         : targetName,
            Body        : filedata
        };
        s3.putObject(putParams, function(err, data){
          if (err) {
            console.log('Could not upload the file. Error :',err);
            return res.send({success:false});
          }
          else{
            fs.unlinkSync(source);
            // Deleting the file from uploads folder(Optional).Do Whatever you prefer.
            console.log('Successfully uploaded the file');
            return res.json(targetName);
          }
        });
      }
      else{
        console.log({'err':err});
      }
    });
  }



module.exports = router;
