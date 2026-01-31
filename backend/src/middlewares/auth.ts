import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware(async (c, next) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = await (verify as any)(token, process.env.JWT_SECRET!)
        c.set('jwtPayload', payload)
        await next()
    } catch (err) {
        return c.json({ error: 'Invalid token' }, 401)
    }
})
