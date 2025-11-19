import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
const alg = "HS256";

export async function signAccessToken(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secretKey);
}

export async function signRefreshToken(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secretKey);
}

export async function verifyToken(token: string) {
    return jwtVerify(token, secretKey);
}
