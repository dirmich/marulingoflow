import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { SrsService } from '../services/srs-service'

const srs = new Hono()

srs.use('*', authMiddleware)

srs.get('/words/today', async (c) => {
    const payload = c.get('jwtPayload') as any
    const userId = payload.sub

    const words = await SrsService.getTodayWords(userId)
    return c.json({ words })
})

srs.post('/review', async (c) => {
    const payload = c.get('jwtPayload') as any
    const userId = payload.sub
    const { word_id, quality } = await c.req.json()

    if (typeof quality !== 'number' || quality < 0 || quality > 5) {
        return c.json({ error: 'Invalid quality score (0-5)' }, 400)
    }

    const result = await SrsService.updateSrsState(userId, word_id, quality)
    return c.json({ success: true, result })
})

export default srs
