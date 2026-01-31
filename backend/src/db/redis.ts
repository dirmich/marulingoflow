import { createClient } from 'redis'

export const redis = createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

// Gamification: Leaderboard Helper
export const updateScore = async (userId: string, score: number) => {
    await redis.zIncrBy('leaderboard', score, userId);
};

export const getLeaderboard = async (limit: number = 10) => {
    return await redis.zRangeWithScores('leaderboard', 0, limit - 1, { REV: true });
};

redis.on('error', (err) => console.log('Redis Client Error', err))

await redis.connect()
