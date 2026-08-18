import mongoose, { Schema } from "mongoose";


const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1700000000/default-thumbnail.png"
        },
        views: {
            type: Number,
            default: 0
        },
        uploader: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        videoFile: {
            public_id: String,
            url: String,
        },
        thumbnailFile: {
            public_id: String,
            url: String,
        },
        description: {
            public_id: String,
            url: String,
        },
        views: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        },
        ispublished: {
            type: Boolean,
            default: false
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }    
)


export const Video = mongoose.model("Video", videoSchema)