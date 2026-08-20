"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Signup() {
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    // ✅ button state
    useEffect(() => {
        setButtonDisabled(
            !user.username || !user.email || !user.password
        );
    }, [user]);

    // ✅ signup handler
    const onSignup = async () => {
        try {
            if (buttonDisabled || loading) return;

            setLoading(true);

            const response = await axios.post("/api/users/signup", {
                username: user.username.trim(),
                email: user.email.trim(),
                password: user.password,
            });

            console.log("Signup success:", response.data);

            router.push("/login");

        } catch (error: any) {
            console.error(
                "Signup error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">

                {/* Title */}
                <h2 className="text-3xl font-semibold text-white text-center mb-6">
                    {loading ? "Creating account..." : "Create Account"}
                </h2>

                {/* Username */}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={user.username}
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                {/* Button */}
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled || loading}
                    className={`w-full p-3 rounded-lg font-medium transition 
                    ${
                        buttonDisabled || loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                >
                    {loading
                        ? "Processing..."
                        : buttonDisabled
                        ? "Fill all fields"
                        : "Sign Up"}
                </button>

                {/* Footer */}
                <p className="mt-6 text-center text-gray-300">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-400 hover:underline"
                    >
                        Log In
                    </Link>
                </p>

            </div>
        </div>
    );
}