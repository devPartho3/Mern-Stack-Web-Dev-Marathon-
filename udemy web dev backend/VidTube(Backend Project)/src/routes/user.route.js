import { Router } from "express";
import {registerUser,logoutUser, loginUser, refreshAccessToken, changecurrentpassword, getuserchannelprofile, updateaccountdetails, updateuseravatar, updateusercoverimage} from "../controllers/user.controller.js";
import {upload} from "../utils/multer.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";



const router=Router();

router.route("/register").post(
    registerUser,
    upload.fields(
        [{
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }]
    )
);
router.route("/logout").post(verifyjwt,logoutUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
//secured routes
router.route("/change-password").post(verifyjwt,changecurrentpassword);
router.route("/getcurrentuser").get(verifyjwt,getuserchannelprofile);
router.route("/c/:username").get(getuserchannelprofile);
router.route("updateaccount").patch(verifyjwt,updateaccountdetails);
router.route("/updateavatar").patch(verifyjwt,upload.single("avatar"),updateuseravatar);
router.route("/coverimage").patch(verifyjwt,upload.single("coverimage"),updateusercoverimage);
export default router;