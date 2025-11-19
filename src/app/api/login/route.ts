import { NextRequest, NextResponse } from "next/server";
import {signAccessToken, signRefreshToken} from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (email !== "test@test.com" || password !== "1234") {
        return NextResponse.json(
            { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
            { status: 401 }
        );
    }

    const userId = "user-1";

    const accessToken = await signAccessToken({ sub: userId, email });
    const refreshToken = await signRefreshToken({ sub: userId, email });

    const res = NextResponse.json({ message: "로그인 성공" });

    res.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15, // 15분
    });

    res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return res;
}
