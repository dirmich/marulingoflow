import { WSContext } from 'hono/ws'

interface Player {
    id: string
    nickname: string
    score: number
    ws: WSContext
}

const rooms = new Map<number, Player[]>()

export const tournamentWSHandler = {
    onOpen: (evt: Event, ws: WSContext) => {
        console.log('WS Connection Open')
    },
    onMessage: async (evt: MessageEvent, ws: WSContext) => {
        const data = JSON.parse(evt.data.toString())
        const { type, tournamentId, userId, nickname, score } = data

        if (type === 'join') {
            const player: Player = { id: userId, nickname, score: 0, ws }
            const players = rooms.get(tournamentId) || []
            players.push(player)
            rooms.set(tournamentId, players)

            // Broadcast join message
            players.forEach(p => p.ws.send(JSON.stringify({
                type: 'player_joined',
                playerCount: players.length,
                nickname
            })))
        }

        if (type === 'update_score') {
            const players = rooms.get(tournamentId) || []
            const player = players.find(p => p.id === userId)
            if (player) {
                player.score = score

                // Send rankings to everyone in the room
                const rankings = players
                    .map(p => ({ nickname: p.nickname, score: p.score }))
                    .sort((a, b) => b.score - a.score)

                players.forEach(p => p.ws.send(JSON.stringify({
                    type: 'rankings',
                    rankings
                })))
            }
        }
    },
    onClose: (evt: Event, ws: WSContext) => {
        // Cleanup player from rooms
        rooms.forEach((players, tournamentId) => {
            const index = players.findIndex(p => p.ws === ws)
            if (index !== -1) {
                players.splice(index, 1)
                players.forEach(p => p.ws.send(JSON.stringify({
                    type: 'player_left',
                    playerCount: players.length
                })))
            }
        })
    },
}
