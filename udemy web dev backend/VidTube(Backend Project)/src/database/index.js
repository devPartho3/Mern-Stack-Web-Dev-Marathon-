import mongoose from "mongoose";
import { DB_NAME } from "../database/constants.js";



const connectDB=async()=>{
    try {
        await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.mskjmfi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);
        console.log("Connected to database successfully");
    }
    catch (error) {
        console.log("Error connecting to database",error);
        process.exit(1);
    }
}

export default connectDB;