import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const verifyjwt = asyncHandler(async (req, res, next) => {

    const token = req.cookies.accesstoken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token is required"
        })
    }
    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedtoken?.id).select("+refreshtoken");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid access token"
        })
    }
    })