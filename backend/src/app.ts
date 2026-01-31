import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

// Middlewares
app.use('*', logger())
app.use('*', cors())

// Routes
app.get('/', (c) => c.text('Lingo-Flow API Service'))

app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    })
})

export default app
