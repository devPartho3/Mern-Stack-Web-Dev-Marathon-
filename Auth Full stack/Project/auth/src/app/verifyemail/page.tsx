"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verify Email
    const verifyEmail = async () => {

        try {

            await axios.post("/api/users/verifyemail", { token });

            setVerified(true);

        } catch (error) {

            console.error("Verification error:", error);

            setError(true);

        } finally {

            setLoading(false);
        }
    };

    // Get token from URL
    useEffect(() => {

        const urlToken = window.location.search.split("token=")[1];

        setToken(urlToken || "");

    }, []);

    // Verify when token exists
    useEffect(() => {

        if (token.length > 0) {
            verifyEmail();
        }

    }, [token]);

    return (

        <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-gray-900 flex items-center justify-center px-4">

            <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white text-center">

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center">

                        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>

                        <h1 className="text-3xl font-bold mb-2">
                            Verifying Email
                        </h1>

                        <p className="text-gray-300">
                            Please wait while we verify your account...
                        </p>

                    </div>
                )}

                {/* Success State */}
                {!loading && verified && (

                    <div className="flex flex-col items-center">

                        {/* Success Icon */}
                        <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center text-5xl mb-6 shadow-lg">
                            ✅
                        </div>

                        {/* Success Text */}
                        <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Verified Successfully
                        </h1>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your email has been successfully verified.
                            You can now access your account and login securely.
                        </p>

                        {/* Highlight Box */}
                        <div className="w-full bg-green-500/10 border border-green-400/30 rounded-2xl p-4 mb-6">

                            <p className="text-green-300 font-medium">
                                ✔ Account verification completed
                            </p>

                            <p className="text-sm text-gray-400 mt-2 break-all">
                                Token: {token}
                            </p>

                        </div>

                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="w-full py-3 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 font-semibold shadow-lg"
                        >
                            Continue to Login
                        </Link>

                    </div>
                )}

                {/* Error State */}
                {!loading && error && (

                    <div className="flex flex-col items-center">

                        {/* Error Icon */}
                        <div className="w-24 h-24 rounded-full bg-red-500/20 border border-red-400 flex items-center justify-center text-5xl mb-6 shadow-lg">
                            ❌
                        </div>

                        <h1 className="text-4xl font-bold text-red-400 mb-3">
                            Verification Failed
                        </h1>

                        <p className="text-gray-300 mb-6">
                            Invalid or expired verification token.
                        </p>

                        {/* Error Box */}
                        <div className="w-full bg-red-500/10 border border-red-400/30 rounded-2xl p-4">

                            <p className="text-red-300 font-medium">
                                Unable to verify your email
                            </p>

                            <p className="text-sm text-gray-400 mt-2 break-all">
                                Token: {token || "No token found"}
                            </p>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}