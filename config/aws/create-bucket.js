const AWS = require('aws-sdk');
const path = require('path');

// set up path to environmental variables
require('dotenv').config({ path: path.join(__dirname, '..', '..', '/.env') });

// set our variables
const ID = process.env.AWSAccessKeyId;
const SECRET = process.env.AWSSecretKey;
const BUCKET_NAME = process.env.BucketName;
const REGION = process.env.Region;

// Initialize the S3 interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// Create our bucket!
const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: REGION
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});