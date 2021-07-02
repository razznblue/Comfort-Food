const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

// set up path to environmental variables
require('dotenv').config({ path: path.join(__dirname, '..', '..', '/.env') });

// set our variables
const ID = process.env.AWSAccessKeyId;
const SECRET = process.env.AWSSecretKey;
const BUCKET_NAME = process.env.BucketName;

// Initialize the S3 interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


const uploadFile = (fileName, filePath) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath + "/" + fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
        ContentType: 'image/' + (fileName.split(".").pop())
    };

    console.log(params);

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = uploadFile;