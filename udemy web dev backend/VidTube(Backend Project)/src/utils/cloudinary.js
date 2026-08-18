import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!fs.existsSync(localFilePath)){
            throw new Error("File does not exist");
        }

        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder:"vidtube"
        });
        console.log("Cloudinary upload response:", response);
        fs.unlinkSync(localFilePath);
        return response.secure_url;
    }catch(error){
        fs.unlinkSync(localFilePath);
        throw error;
    }
}

export  {uploadOnCloudinary};