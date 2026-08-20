import mongoose from "mongoose";

export async function connect() {
    try {
        if (mongoose.connections[0].readyState) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URI!);

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log("MongoDB connection error");
        console.log(error);
        throw error;
    }
}