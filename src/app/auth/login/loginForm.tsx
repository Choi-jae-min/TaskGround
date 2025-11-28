'use client'
import React, { useState } from 'react';
import {useRouter} from "next/navigation";

const LoginForm = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        if (!email || !password) {
            return setAlertMessage('이메일과 비밀번호를 정확히 입력해주세요.');
        }

        const res = await fetch(`${process.env.WORKSPACE_SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email,password}),
        })
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            return setAlertMessage(
                data.message || '로그인에 실패했습니다. 다시 시도해주세요.'
            );
        }
        setAlertMessage('');
        return router.push('/auth/mypage');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-black relative">
            <div>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                    required
                    name="email"
                    type="email"
                    placeholder="example@taskground.com"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <input
                    required
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition font-medium"
            >
                로그인
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${
                    alertMessage ? 'max-h-10' : 'max-h-0'
                }`}
            >
                <p
                    className={`text-red-500 text-[12px] text-center transition-all duration-300 ${
                        alertMessage
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                    }`}
                >
                    {alertMessage}
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
