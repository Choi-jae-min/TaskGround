'use client'
import React from 'react';
import {useRouter} from "next/navigation";

const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        return router.push('/')
    }

    return (
        <button
            onClick={handleLogout}
            className="
        px-4 py-2 rounded-md
        bg-red-500 text-white font-medium
        hover:bg-red-600
        disabled:bg-red-300 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center gap-2
      "
        >
            로그아웃
        </button>
    );
};

export default Logout;