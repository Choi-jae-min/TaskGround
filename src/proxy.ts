import { NextRequest, NextResponse } from "next/server";
import {signAccessToken, verifyToken} from "@/lib/auth";

const PUBLIC_PATHS = ["/auth/login", "/api/login", "/_next", "/favicon.ico"];

function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}
export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (accessToken) {
        try {
            await verifyToken(accessToken);
            return NextResponse.next();
        } catch (err) {
            // access 토큰이 만료/유효하지 않으면 아래에서 refresh 체크
        }
    }

    if (refreshToken) {
        try {
            const { payload } = await verifyToken(refreshToken);

            const newAccessToken = await signAccessToken({
                sub: payload.sub,
                email: payload.email,
            });

            const res = NextResponse.next();

            res.cookies.set("access_token", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 15, // 15분
            });

            return res;
        } catch (err) {
            const loginUrl = new URL("/auth/login", req.url);
            const res = NextResponse.redirect(loginUrl);
            res.cookies.delete("access_token");
            res.cookies.delete("refresh_token");
            return res;
        }
    }

    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
