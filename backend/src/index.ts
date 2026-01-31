import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono().basePath('/api/v1')

// Middlewares
app.use('*', logger())

// Health Check
app.get('/health', (c) => {
    return c.json({ status: 'ok', server: 'Lingo-Flow Backend' })
})

const port = Number(process.env.BACKEND_PORT) || 8000

console.log(`Lingo-Flow Backend is running on port ${port}`)

export default {
    port: port,
    fetch: app.fetch,
}
