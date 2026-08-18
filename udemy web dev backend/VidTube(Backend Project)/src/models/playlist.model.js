import mongoose,{Schema} from "mongoose";


const playlistSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        description:{  
            type:String,
            trim:true,
        },
        thumbnail:{
            type:String,
            default:"https://res.cloudinary.com/dzcmadjlq/image/upload/v1700000000/default-playlist-thumbnail.png"
        },
        videos:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        creator:{
            type:Schema.Types.ObjectId, 
            ref:"User",
            required:true
        }
    },
    {timestamps:true}
)

export const Playlist = mongoose.model("Playlist",playlistSchema)