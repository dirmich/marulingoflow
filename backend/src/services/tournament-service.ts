import sql from '../db'

export class TournamentService {
    static async getActiveTournaments(languageId?: number) {
        if (languageId) {
            return await sql`
        SELECT * FROM tournaments 
        WHERE status = 'ongoing' AND language_id = ${languageId}
      `
        }
        return await sql`
      SELECT * FROM tournaments WHERE status = 'ongoing'
    `
    }

    static async getTournamentById(id: number) {
        const [tournament] = await sql`SELECT * FROM tournaments WHERE id = ${id}`
        return tournament
    }
}
