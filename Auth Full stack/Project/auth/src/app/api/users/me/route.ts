import { getDataFromToken } from "@/helpers/getdatafromtoke";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

await connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findById(userId).select("-password");

        return NextResponse.json(
            { user },
            { status: 200 }
        );
        

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { user },
            { status: 200 }
        );

    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}