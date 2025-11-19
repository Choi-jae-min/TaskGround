import React from "react";
import LoginForm from "@/app/auth/login/loginForm";

const Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  bg-[#f7f7f8] px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

                <div className="text-center mb-8">
                    <h1 className="text-3xl text-blue-400 font-extrabold tracking-tight">
                        TASK <span className="text-black">GROUND</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        효율적인 작업을 위한 시작점
                    </p>
                </div>

                <LoginForm/>

                <div className="text-center text-sm text-gray-500 mt-6">
                    계정이 없나요?{" "}
                    <a href="/signup" className="text-black font-medium underline">
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Page;
