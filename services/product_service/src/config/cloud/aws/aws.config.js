import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand} from '@aws-sdk/client-s3';
import S3Presigner from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';


import AWSHelper from './aws.helpers.js';

import { getFileName } from '../../../utils/fileUtils.js';

const {getSignedUrl} = S3Presigner;

dotenv.config();

const s3Client= new S3Client({
            credentials:{
                accessKeyId:process.env.AWS_ENV_BUCKET_ACCESS_KEY_ID,
                secretAccessKey:process.env.AWS_ENV_BUCKET_SECRET_ACCESS_KEY,
            },
            region:process.env.AWS_ENV_BUCKET_REGION
        });


const uploadToS3 =  (file)=>{
    const fileName = getFileName(file);
    const bucket = process.env.AWS_ENV_BUCKET_NAME;
    const command = new PutObjectCommand({
        Bucket:bucket,
        Key:AWSHelper.getFileWithAWSFolder(fileName),
        Body:file.buffer,
        ContentType:file.mimeType
    })

    s3Client.send(command).then((data)=>data).catch((error)=> {
       console.error(error);
    //    throw new Error("Error While Uploading...");
    })
}


const getAwsPresignedUrl= async (key)=>{
    const bucketName=process.env.AWS_ENV_BUCKET_NAME;
    const command = new GetObjectCommand({
        Bucket:bucketName,
        Key:AWSHelper.getFileWithAWSFolder(key)
    });

   const presignedUrl = await getSignedUrl(s3Client,command,{expiresIn:45*60*60});
   return presignedUrl;
}


const deleteFileFromS3=async (key)=>{
    const bucket=process.env.AWS_ENV_BUCKET_NAME;
    const command=  new DeleteObjectCommand({
        Bucket:bucket,
        Key:AWSHelper.getFileWithAWSFolder(key),
    });

    await s3Client.send(command);
}



const AWSUploader = {
    uploadToS3,
    getAwsPresignedUrl,
    deleteFileFromS3,
}

export default AWSUploader;