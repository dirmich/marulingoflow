import { Hono } from "hono";
import db from "../db";
import { adminMiddleware } from "../middlewares/admin";

const admin = new Hono();

admin.use("*", adminMiddleware);

// 전체 사용자 통계
admin.get("/stats", async (c) => {
    const [userCount = { count: 0 }] = await db`SELECT count(*) FROM users`;
    const [wordCount = { count: 0 }] = await db`SELECT count(*) FROM words`;
    const [activeSessions = { count: 0 }] = await db`SELECT count(*) FROM srs_states WHERE last_review > now() - interval '24 hours'`;

    return c.json({
        total_users: userCount.count,
        total_words: wordCount.count,
        active_24h: activeSessions.count
    });
});

// 전체 사용자 목록
admin.get("/users", async (c) => {
    const users = await db`SELECT id, email, nickname, role, created_at FROM users ORDER BY created_at DESC`;
    return c.json({ users });
});

export default admin;
