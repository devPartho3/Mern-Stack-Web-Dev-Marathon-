import mongoose, { Schema } from "mongoose";


const likeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        video: { 
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
)

export const Comment = mongoose.model("Comment", likeSchema)