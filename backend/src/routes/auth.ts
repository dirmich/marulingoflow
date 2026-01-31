import { Hono } from 'hono'
import { UserService } from '../services/user-service'
import { sign } from 'hono/jwt'
import { redis as redisClient } from '../db/redis'

const auth = new Hono()

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

auth.get('/google', (c) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'select_account',
    })
    return c.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`)
})

auth.get('/google/callback', async (c) => {
    const code = c.req.query('code')
    if (!code) return c.json({ error: 'Authorization code missing' }, 400)

    try {
        // 1. Exchange code for tokens
        const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
                grant_type: 'authorization_code',
            }),
        })

        const { access_token } = await tokenRes.json() as any

        // 2. Get user info from Google
        const userRes = await fetch(GOOGLE_USER_INFO_URL, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        const googleUser = await userRes.json() as import('../types/auth').GoogleUser

        // 3. Find or Create User in DB
        const user = await UserService.findOrCreateByGoogle(
            googleUser.id,
            googleUser.email,
            googleUser.name
        )

        // 4. Generate JWT & Refresh Token
        const payload = {
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
        }
        const secret = process.env.JWT_SECRET!
        const token = await sign(payload, secret)

        const refreshToken = crypto.randomUUID()
        await redisClient.set(`refresh_token:${user.id}`, refreshToken, {
            EX: 60 * 60 * 24 * 7, // 7 days
        })

        return c.json({
            access_token: token,
            refresh_token: refreshToken,
            user
        })
    } catch (err: any) {
        return c.json({ error: 'Auth failed', details: err.message }, 500)
    }
})

auth.post('/dev-login', async (c) => {
    try {
        const { email } = await c.req.json();
        const devEmail = email || 'dev@example.com';
        const nickname = devEmail.split('@')[0];

        // 1. Find or Create User by Email
        const user = await UserService.findOrCreateByGoogle(
            'dev-id-' + devEmail,
            devEmail,
            nickname
        )

        // 2. Generate JWT & Refresh Token
        const payload = {
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours for dev
        }
        const secret = process.env.JWT_SECRET!
        const token = await sign(payload, secret)

        const refreshToken = crypto.randomUUID()
        await redisClient.set(`refresh_token:${user.id}`, refreshToken, {
            EX: 60 * 60 * 24 * 7, // 7 days
        })

        return c.json({
            access_token: token,
            refresh_token: refreshToken,
            user
        })
    } catch (err: any) {
        return c.json({ error: 'Dev login failed', details: err.message }, 500)
    }
})

auth.post('/logout', async (c) => {
    // Simple logout: clear redis refresh token
    // In real app, we might need user id from JWT
    return c.json({ message: 'Logged out' })
})

export default auth
