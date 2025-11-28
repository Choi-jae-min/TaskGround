'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('??')
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordCheck = formData.get('password_check');
        const name = formData.get('name');

        if(password !== passwordCheck){
            return setAlertMessage('비밀번호가 일치하지 않습니다.');
        }

        if (!email || !password || !name) {
            return setAlertMessage('모든 항목을 입력해주세요.');
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.ok) {
            return setAlertMessage(data.message || '회원가입에 실패했습니다.');
        }

        setAlertMessage('');
        return router.push('/auth/login');
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl text-blue-400 font-extrabold tracking-tight">
                        회원가입
                    </h1>
                </div>

                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                    required
                    name="email"
                    type="email"
                    placeholder="example@taskground.com"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />

                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <div className="relative">
                    <input
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black text-lg"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>

                <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
                <div className="relative">
                    <input
                        required
                        name="password_check"
                        type={showPasswordCheck ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswordCheck((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black text-lg"
                    >
                        {showPasswordCheck ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>

                <label className="block text-sm font-medium mb-1">이름</label>
                <input
                    required
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />

                <p
                    className={`text-red-500 text-[12px] text-center transition-all duration-300 pt-2 ${
                        alertMessage
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                    }`}
                >
                    {alertMessage}
                </p>

                <button
                    type="submit"
                    className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition font-medium"
                >
                    회원가입
                </button>

            </div>
        </form>
    );
};

export default SignUpPage;
