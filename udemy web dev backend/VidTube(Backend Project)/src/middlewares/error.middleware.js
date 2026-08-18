import mongoose from "mongoose";

import Apierror from "../utils/apierror.js";

const errorHandler=(err,req,res,next)=>{
    console.error("Error:", err);

    if(err instanceof Apierror){
        return res.status(err.statuscode).json({
            status:"error",
            message:err.message,
            error:err.error
        });
    }
    const message=err.message || "Internal Server Error";
    const statuscode=err.statuscode || 500;

}

export  {errorHandler}