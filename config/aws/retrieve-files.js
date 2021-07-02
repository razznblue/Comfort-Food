// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const path = require('path');

// set up path to environmental variables
require('dotenv').config({ path: path.join(__dirname, '..', '..', '/.env') });
// set our variables
const ID = process.env.AWSAccessKeyId;
const SECRET = process.env.AWSSecretKey;
const BUCKET_NAME = process.env.BucketName;

const BUCKET = {

    async getAllFiles() {
        try {
            AWS.config.setPromisesDependency();
            AWS.config.update({
                accessKeyId: ID,
                secretAccessKey: SECRET,
            });
    
            const s3 = new AWS.S3();
            const response = await s3.listObjectsV2({
                Bucket: BUCKET_NAME
            }).promise();
    
            console.log(response);
            
        } catch (e) {
            console.log("Error,", e);
        }
    },
    
    async getFile(fileName) {
        try {
            AWS.config.setPromisesDependency();
            AWS.config.update({
                accessKeyId: ID,
                secretAccessKey: SECRET,
            });
    
            const s3 = new AWS.S3();
            const response = await s3.getObject({
                Bucket: BUCKET_NAME,
                Key: fileName
            }).promise();
    
            return response;
            
        } catch (e) {
            console.log("Error,", e);
        }
    }

}

//getAllFiles();
//console.log(getFile('1625184010795.jpg'));

module.exports = BUCKET;