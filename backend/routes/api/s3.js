const express = require('express');
const router = express.Router();
const multer = require('multer')
const AWS = require('aws-sdk');
const fs = require('fs');
const keys = require('../../keys')

const storage = multer.diskStorage({
  destination: "../uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname )
  }

})

const upload = multer({ storage: storage });

AWS.config.update({
  accessKeyId: keys.iam_access_id,
  secretAccessKey: keys.iam_secret,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

//POST method route for uploading file
router.post('/post_file', upload.single("img"), function (req, res) {
  console.log(req.body)
  //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
  //req.file is the demo_file
  // uploadFile(req.img.path, req.img.filename ,res);
})

//GET method route for downloading/retrieving file
router.get('/get_file/:file_name',(req,res)=>{
  console.log(req.params.file_name)
  // console.log(keys.iam_secret)
  // retrieveFile(req.params.file_name, res);
});

router.get('/', (req, res) => {
  res.json('connected')
});

// Functions

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
            // fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
            console.log('Successfully uploaded the file');
            return res.send({success:true});
          }
        });
      }
      else{
        console.log({'err':err});
      }
    });
  }

//The retrieveFile function
function retrieveFile(filename,res){

  const getParams = {
    Bucket: 'the-pass',
    Key: `/photos/${filename}`
  };

  s3.getObject(getParams, function(err, data) {
    if (err){
      return res.status(400).send({success:false,err:err});
    }
    else{
      return res.send(data.Body);
    }
  });
}

module.exports = router;
