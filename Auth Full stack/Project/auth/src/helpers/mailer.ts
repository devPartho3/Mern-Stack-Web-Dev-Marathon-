import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function sendEmail(email: string, emailtype: string, userId: string) {
    try {
        const hashedtoken = bcryptjs.hash(userId.toString(), 10)
        if (emailtype === "verify") {
            await User.findByIdAndUpdate(userId, { verifytoken: hashedtoken, verifytokenexpiry: Date.now() + 3600000 }, { new: true })
        } else if (emailtype === "reset") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedtoken, forgotPasswordTokenExpiry: Date.now() + 3600000 }, { new: true })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c0cb2a44ce4fce",
                pass: "7408fcf4775258"
            }
        });

        const mailOptions = {
            from: "dev481047@gmail.com",
            to: email,
            subject: emailtype === "verify" ? "Verify your email" : "Reset your password",
            text: `Click the link to ${emailtype === "verify" ? "verify your email" : "reset your password"}: ${process.env.DOMAIN}/api/users/${emailtype}?token=${hashedtoken}`
        };

        const mailresponse=await transport.sendMail(mailOptions);
        console.log("Email sent:", mailresponse);
        return mailresponse;
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

