import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );
        response.cookies.set({
            name: "access_token",
            value: "",
            path: "/",
            expires: new Date(0),
        });

        response.cookies.set({
            name: "refresh_token",
            value: "",
            path: "/",
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { message: "Logout failed" },
            { status: 500 }
        );
    }
}
