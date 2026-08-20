import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = ["/login", "/signup"].includes(path);

    const token = request.cookies.get("token")?.value;

    // If user is logged in and tries to access login/signup → redirect to profile
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // If user is NOT logged in and tries to access protected pages → redirect login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ IMPORTANT: allow request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/profile", "/login", "/signup","/verifyemail"],
};