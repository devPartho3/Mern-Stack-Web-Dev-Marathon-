import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";



const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;
    //validation
    if (fullname?.trim() === "" || username?.trim() === "" || email?.trim() === "" || password?.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const existeduser = await User.findOne
        ({
            $or: [
                { email: email },
                { username: username }

            ]
        });

    if (existeduser) {
        throw new apiError("User already exists", 400);
    }

    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverlocalpath = req.files?.coverImage[0]?.path;

    if (!avatarlocalpath || !coverlocalpath) {
        return res.status(400).json({
            success: false,
            message: "Avatar and cover image are required"
        })
    }
    const avatar = await uploadOnCloudinary(avatarlocalpath)
    if (coverlocalpath) {
        const coverImage = await uploadOnCloudinary(coverlocalpath)
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url,
        username,
        email,
        password
    })

    const createduser = await User.findById(user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");

    if (!createduser) {
        throw new apiError("User registration failed", 500);
    }
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: createduser
    })
    console.log("User registered successfully");
});
const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new apiError("User not found", 404);
        }
        const accesstoken = User.generateAccessToken()
        const refreshtoken = User.generateRefreshToken()
        user.refreshtoken = refreshtoken;
        await user.save();
        return { accesstoken, refreshtoken };
    } catch (error) {
        throw new apiError("Token generation failed", 500);
    }
};

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email?.trim() === "" || password?.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        })
    }
    const user = await User.findOne({ email: email }).select("+password +refreshtoken");
    if (!user) {
        throw new apiError("Invalid email or password", 401);
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new apiError("Invalid email or password", 401);
    }
    const { accesstoken, refreshtoken } = await generateAccessTokenandRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");
    if (!loggedInUser) {
        throw new apiError("Login failed", 500);
    }
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
    }
    return res
        .status(200)
        .cookie("refreshtoken", refreshtoken, options)
        .json({
            success: true,
            message: "Login successful",
            user: loggedInUser,
            accesstoken, refreshtoken
        })
    console.log("Login successful, access token and refresh token generated");
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshtoken = req.cookies.refreshtoken || req.body.refreshtoken;
    if (!incomingRefreshtoken) {
        return res.status(400).json({
            success: false,
            message: "Refresh token is required"
        })
    }
    try {
        const decodedtoken = jwt.verify(incomingRefreshtoken, process.env.JWT_SECRET);
        const user = await User.findById(decodedtoken?.id).select("+refreshtoken");
        if (!user || user.refreshtoken !== incomingRefreshtoken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }
        if (incomingRefreshtoken !== user?.refreshtoken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
        }
        const { accesstoken, newrefreshtoken } = await generateAccessTokenandRefreshToken(user._id)

        return res
            .status(200)
            .cookie("refreshtoken", newrefreshtoken, options)
            .json({
                success: true,
                message: "Access token refreshed successfully",
                accesstoken
            })


    } catch (error) {
        throw new apiError("Failed to refresh access token", 500);
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    const incomingRefreshtoken = req.cookies.refreshtoken || req.body.refreshtoken;
    if (!incomingRefreshtoken) {
        return res.status(400).json({
            success: false,
            message: "Refresh token is required"
        })
    }
    try {
        const decodedtoken = jwt.verify(incomingRefreshtoken, process.env.JWT_SECRET);
        const user = await User.findById(decodedtoken?.id).select("+refreshtoken");
        if (!user || user.refreshtoken !== incomingRefreshtoken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }
        user.refreshtoken = null;
        await user.save();
        res.clearCookie("refreshtoken");
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        throw new apiError("Logout failed", 500);
    }
});


const changecurrentpassword = asyncHandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
        throw new apiError("User not found", 404);
    }
    const isPasswordMatch = await user.comparePassword(oldpassword);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: "Old password is incorrect"
        })
    }
    user.password = newpassword;
    await user.save();
    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })
})

const getcurrentuser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");
    if (!user) {
        throw new apiError("User not found", 404);
    }
    return res.status(200).json({
        success: true,
        user
    })
    console.log("Current user details retrieved successfully");
})

const updateaccountdetails = asyncHandler(async (req, res) => {
    const { fullname, username, email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new apiError("User not found", 404);
    }
    if (fullname?.trim() === "" || username?.trim() === "" || email?.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const isUsernameTaken = await User.findOne({ username: username, _id: { $ne: req.user._id } });
    if (isUsernameTaken) {
        return res.status(400).json({
            success: false,
            message: "Username is already taken"
        })
    }
    const isEmailTaken = await User.findOne({ email: email, _id: { $ne: req.user._id } });
    if (isEmailTaken) {
        return res.status(400).json({
            success: false,
            message: "Email is already taken"
        })
    }
    user.fullname = fullname;
    user.username = username;
    user.email = email;
    await user.save();
    const updateduser = await User.findById(user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");
    return res.status(200).json({
        success: true,
        message: "Account details updated successfully",
        user: updateduser
    })
})

const updateuseravatar = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new apiError("User not found", 404);
    }
    const avatarlocalpath = req.files?.avatar[0]?.path;
    if (!avatarlocalpath) {
        return res.status(400).json({
            success: false,
            message: "Avatar image is required"
        })
    }
    const avatar = await uploadOnCloudinary(avatarlocalpath)
    user.avatar = avatar.url;
    await user.save();
    const updateduser = await User.findById(user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");
    return res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        user: updateduser
    })
    console.log("User avatar updated successfully");
})

const updateusercoverimage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new apiError("User not found", 404);
    }
    const coverlocalpath = req.files?.coverImage[0]?.path;
    if (!coverlocalpath) {
        return res.status(400).json({
            success: false,
            message: "Cover image is required"
        })
    }
    const coverImage = await uploadOnCloudinary(coverlocalpath)
    user.coverimage = coverImage.url;
    await user.save();
    const updateduser = await User.findById(user._id).select("-password -refreshtoken -__v -createdAt -updatedAt");
    return res.status(200).json({
        success: true,
        message: "Cover image updated successfully",
        user: updateduser
    })
    console.log("User cover image updated successfully");
})

const getuserchannelprofile = asyncHandler(async (req, res) => {
    const username = req.params
    if (!username) {
        return res.status(400).json({
            success: false,
            message: "Username is required"
        })
    }
    const channel = await User.aggregate([
        {
            $match: { username: username }
        },
        {
            $lookup: {
                from: "Subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "Subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedto"
            }
        },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                subscribedToCount: { $size: "$subscribedto" },
                isSubscribed: {
                    $if: {
                        $in: [req.user._id, "$subscribers.subscriber"],
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                password: 0,
                fullname: 1,
                username: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                subscribedToCount: 1,
                isSubscribed: 1
            }
        }
    ]);

    if (!channel || channel.length === 0) {
        throw new apiError("Channel not found", 404);
    }
    return res.status(200).json({
        success: true,
        channel: channel[0]
    })
    console.log("User channel profile retrieved successfully");
})

const getwatchhistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([

        {
            $match: { _id: req.user._id }
        },
        {
            $lookup: {
                from: "Videos",
                localField: "watchhistory",
                foreignField: "_id",
                as: "watchhistorydetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owener",
                            foreignField: "_id",
                            as: "ownerDetails",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields: {
                            owner: { $arrayElemAt: ["$ownerDetails", 0] }
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            description: 1,
                            thumbnail: 1,
                            videoUrl: 1,
                            owner: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                watchhistorydetails: 1,
                _id: 0
            }
        }
    ]);
    if (!user || user.length === 0) {
        throw new apiError("User not found", 404);
    }
    return res.status(200).json({
        success: true,
        watchhistory: user[0]?.watchhistorydetails || []
    });
    console.log("User watch history retrieved successfully");
})

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changecurrentpassword,
    getcurrentuser,
    updateaccountdetails,
    updateuseravatar,
    updateusercoverimage,
    getuserchannelprofile,
    getwatchhistory
};