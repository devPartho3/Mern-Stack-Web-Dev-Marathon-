import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



await connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(reqBody);
        const user=await User.findOne({
            verifytoken: token,
            verifytokenexpiry: {$gt: Date.now()}
        })
        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }
        console.log(user);
        user.isVerified=true;
        user.verifytoken=undefined;
        user.verifytokenexpiry=undefined;
        await user.save();
        return NextResponse.json({message: "Email verified successfully"}, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}