
import crypto from 'crypto';


const keyForFileName='modifiedFileName'

const generateFileName =(file,{userId,restaurantId,restaurantOwnerId})=>{
    const fileName = Buffer.from(`${Date.now()}_${file.originalname}`).toString("hex");
    const ext = file.mimetype.split("/")[1];
    return `${userId}_${restaurantId}_${restaurantOwnerId}__${Date.now()}_${crypto.randomBytes(16).toString("hex")}_${fileName}.${ext}`
}

export const generateFileNameFromFileObject =(file,headers)=>{
    const fileName = generateFileName(file,headers);
    return {...file,[keyForFileName]:fileName}
}

export const getFileName=(file)=>{
    return file[keyForFileName]
}