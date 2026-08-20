"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // ✅ safer button state handling
    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    const onLogin = async () => {
        try {
            if (!user.email || !user.password) return;

            setLoading(true);

            const res = await axios.post("/api/users/login", {
                email: user.email.trim(),
                password: user.password,
            });

            console.log("Login success:", res.data);

            router.push("/profile");

        } catch (err: any) {
            console.error(
                "Login error:",
                err.response?.data || err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">

                {/* Title */}
                <h1 className="text-3xl font-semibold text-white text-center mb-6">
                    {loading ? "Logging in..." : "Welcome Back"}
                </h1>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email address"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full p-3 rounded-lg font-medium transition 
                    ${
                        buttonDisabled || loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                >
                    {loading
                        ? "Logging in..."
                        : buttonDisabled
                        ? "Fill all fields"
                        : "Login"}
                </button>

                {/* Footer */}
                <p className="mt-6 text-center text-gray-300">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-400 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}