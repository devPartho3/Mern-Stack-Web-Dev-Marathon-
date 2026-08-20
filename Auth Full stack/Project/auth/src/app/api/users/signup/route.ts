import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

await connect();

// Optional GET test route
export async function GET() {
    return NextResponse.json({
        message: "Signup API is working",
    });
}

export async function POST(request: NextRequest) {
    try {

        let reqBody;

        try {
            reqBody = await request.json();
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid or empty JSON body" },
                { status: 400 }
            );
        }

        const { username, email, password } = reqBody;

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        console.log("Signup request:", reqBody);

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user
        const newUser = new User({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        console.log("User created:", savedUser._id);

        // Send verification email
        await sendEmail(
            email,
            "verify",
            savedUser._id.toString()
        )
        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
            },
            { status: 201 }
        );

    } catch (error: any) {

        console.error("SIGNUP ERROR:", error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

