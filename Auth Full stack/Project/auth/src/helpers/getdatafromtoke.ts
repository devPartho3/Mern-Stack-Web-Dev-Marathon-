import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken: any = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        );

        return decodedToken.id;

    } catch (error) {
        console.log("TOKEN ERROR:", error);
        throw new Error("Invalid token");
    }
}