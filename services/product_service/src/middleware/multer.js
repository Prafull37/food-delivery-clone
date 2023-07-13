import multer from 'multer';


const storage = multer.memoryStorage();

const allowedType=['image','video'];

const filter= (req,file,cb)=>{
     const [filetype] = file.mimetype.split("/")[0];
     if(allowedType.includes(filetype)){
        cb(null,true)
     }else{
     cb(null, new Error("Please upload image or video") )
     }
}


const upload = multer({
    storage:storage,
    fileFilter:filter,
})

export default upload;