import { createBunWebSocket } from 'hono/bun'
import app from './app'
import { tournamentWSHandler } from './routes/websocket'

const { upgradeWebSocket, websocket } = createBunWebSocket()

app.get('/tournament/ws', upgradeWebSocket((c) => tournamentWSHandler))

const port = Number(process.env.BACKEND_PORT) || 8000

console.log(`🚀 Lingo-Flow Backend is running on port ${port}`)

export default {
    port: port,
    fetch: app.fetch,
    websocket,
}
