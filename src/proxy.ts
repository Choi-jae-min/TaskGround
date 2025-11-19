import { NextRequest, NextResponse } from "next/server";
import { signAccessToken, verifyToken } from "@/lib/auth";

const PUBLIC_PATHS = ["/auth/login", "/api/login", "/_next", "/favicon.ico"];

function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    const isPublic = isPublicPath(pathname);

    if (accessToken) {
        try {
            await verifyToken(accessToken);
            if (isPublic && pathname.startsWith("/auth/login")) {
                const mypageUrl = new URL("/auth/mypage", req.url);
                return NextResponse.redirect(mypageUrl);
            }

            return NextResponse.next();
        } catch (err) {
            // accessToken 깨졌으면 refreshToken 로직으로 넘어감
        }
    }

    if (refreshToken) {
        try {
            const { payload } = await verifyToken(refreshToken);

            const newAccessToken = await signAccessToken({
                sub: payload.sub,
                email: payload.email,
            });

            if (isPublic && pathname.startsWith("/auth/login")) {
                const mypageUrl = new URL("/auth/mypage", req.url);
                const res = NextResponse.redirect(mypageUrl);

                res.cookies.set("access_token", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    maxAge: 60 * 15,
                });

                return res;
            }

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

    if (isPublic) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
