import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import auth from './routes/auth'
import srs from './routes/srs'
import quiz from './routes/quiz'
import community from './routes/community'

const app = new Hono()

// Middlewares
app.use('*', logger())
app.use('*', cors())

// Routes
app.route('/auth', auth)
app.route('/srs', srs)
app.route('/quiz', quiz)
app.route('/community', community)

app.get('/', (c) => c.text('Lingo-Flow API Service'))

app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    })
})

export default app
