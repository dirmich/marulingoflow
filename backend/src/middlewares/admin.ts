import { Context, Next } from "hono";
import { getJWTUser } from "./auth"; // 가정된 유틸함수

export const adminMiddleware = async (c: Context, next: Next) => {
    const user = c.get('jwtPayload'); // Hono auth middleware에서 설정됨

    if (user?.role !== 'ADMIN') {
        return c.json({ error: "Forbidden: Admin access only" }, 403);
    }

    await next();
};
