export function errorLogger(err,req,res,next){
    // console.log("going...");
    console.log(err.message);
    const errStatus = err.statusCode || 500;
    console.log(errStatus);
    next({...err,statusCode:errStatus},req,res)
}

export function failSafeError(err,req,res,next){
    // console.log("going... failSafeError")
    if(err.statusCode === 500){
        next({...err,message:"Something Went Wrong !! It's not you, It's Us. We are working on it"},req,res)
    }
    next(err,req,res);
}


export function errorResponder(err,req,res,next){
    const {statusCode,message}= err;
    if(!!res) return res.status(statusCode).json({message:message})
    return
}

