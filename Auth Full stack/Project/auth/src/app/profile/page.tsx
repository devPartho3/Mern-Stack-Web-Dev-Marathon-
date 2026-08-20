"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Profile() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Logout
    const logout = async () => {
        try {
            await fetch("/api/users/logout", {
                method: "GET",
            });

            window.location.href = "/login";

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Get User
    const getUserDetails = async () => {
        try {
            setLoading(true);

            const res = await axios.get("/api/users/me");

            setData(res.data.user);

        } catch (error: any) {
            console.error("Get user error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-gray-900 flex items-center justify-center px-4">

            {/* Glass Card */}
            <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">

                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-linear-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg mb-4">
                        {data?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <h1 className="text-3xl font-bold tracking-wide">
                        My Profile
                    </h1>

                    <p className="text-gray-300 mt-2 text-sm">
                        Professional Dashboard
                    </p>
                </div>

                {/* User Info */}
                <div className="space-y-4 mb-8">

                    {loading && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center animate-pulse">
                            Loading user details...
                        </div>
                    )}

                    {!data && !loading && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center text-gray-300">
                            No user data loaded
                        </div>
                    )}

                    {data && (
                        <div className="space-y-4">

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <p className="text-gray-400 text-sm mb-1">
                                    Username
                                </p>

                                <p className="text-lg font-semibold">
                                    {data.username}
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <p className="text-gray-400 text-sm mb-1">
                                    Email Address
                                </p>

                                <p className="text-lg font-semibold break-all">
                                    {data.email}
                                </p>
                            </div>

                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4">

                    <button
                        onClick={getUserDetails}
                        className="w-full py-3 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 font-semibold shadow-lg"
                    >
                        {loading ? "Loading..." : "Get User Details"}
                    </button>

                    <button
                        onClick={logout}
                        className="w-full py-3 rounded-2xl bg-linear-to-r from-red-500 to-pink-600 hover:scale-[1.02] transition-all duration-300 font-semibold shadow-lg"
                    >
                        Logout
                    </button>

                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/signup"
                        className="text-cyan-400 hover:text-cyan-300 transition duration-300 text-sm"
                    >
                        Create another account
                    </Link>
                </div>

            </div>
        </div>
    );
}