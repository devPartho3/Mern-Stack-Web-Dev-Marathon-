import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1700000000/default-avatar.png"
        },

        coverimage: {
            type: String,
            default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1700000000/default-cover-image.png"
        },
        watchhistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        refreshtoken: {
            type: String,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    //short lived token
    return jwt.sign({ 
        id: this._id,
        role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

userSchema.methods.generateRefreshToken = function () {
    //short lived token
    return jwt.sign({ 
        id: this._id,
        role: this.role,
            },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    ) 
}


export const User = mongoose.model("User", userSchema)