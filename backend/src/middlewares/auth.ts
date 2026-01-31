import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware(async (c, next) => {
    const authHeader = c.req.header('Authorization')
    console.log('[AuthMiddleware] Header:', authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('[AuthMiddleware] Missing or invalid header format')
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = await (verify as any)(token, process.env.JWT_SECRET!, 'HS256')
        console.log('[AuthMiddleware] Token verified, user:', payload.sub)
        c.set('jwtPayload', payload)
        await next()
    } catch (err) {
        console.error('[AuthMiddleware] Verification failed:', err)
        return c.json({ error: 'Invalid token' }, 401)
    }
})
