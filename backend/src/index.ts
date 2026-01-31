import app from './app'

const port = Number(process.env.BACKEND_PORT) || 8000

console.log(`🚀 Lingo-Flow Backend is running on port ${port}`)

export default {
    port: port,
    fetch: app.fetch,
}
