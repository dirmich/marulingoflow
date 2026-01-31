import { Hono } from "hono";
import { getLeaderboard } from "../db/redis";
import { authMiddleware } from "../middlewares/auth";

const leaderboard = new Hono();

leaderboard.use("*", authMiddleware);

leaderboard.get("/", async (c) => {
    try {
        const board = await getLeaderboard(10);
        return c.json({ leaderboard: board });
    } catch (e) {
        return c.json({ error: "Failed to fetch leaderboard" }, 500);
    }
});

export default leaderboard;
