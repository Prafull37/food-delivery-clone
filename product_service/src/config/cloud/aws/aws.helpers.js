import dotenv from 'dotenv';

dotenv.config();

const folderNameOnEvironement={
    DEV:'dev',
    TEST:'TEST',
    PROD:'PROD'
}


const getFileWithAWSFolder=(filename)=>{
    return `${process.env.AWS_ENV_FOLDER}${folderNameOnEvironement[process.env.ENV]}/${filename}`
}


const AWSHelper ={
    getFileWithAWSFolder,
}

export default AWSHelper;