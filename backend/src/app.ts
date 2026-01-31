import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import auth from './routes/auth'
import srs from './routes/srs'
import quiz from './routes/quiz'
import community from './routes/community'
import admin from './routes/admin'
import { GeminiService } from './services/gemini-service'

const app = new Hono()

// Middlewares
app.use('*', logger())
app.use('*', cors())

// Routes
app.route('/auth', auth)
app.route('/srs', srs)
app.route('/quiz', quiz)
app.route('/community', community)
app.route('/admin', admin)

// AI 예문 생성 API 엔드포인트
app.get('/ai/example/:word', async (c) => {
    const gemini = new GeminiService();
    const word = c.req.param('word');
    const result = await gemini.generateExample(word, 'English');
    return c.json(result);
});

app.get('/', (c) => c.text('Lingo-Flow API Service'))

app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    })
})

export default app
