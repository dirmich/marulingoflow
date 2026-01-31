import sql from '../db'

export class WordService {
    static async getWordsByLanguage(languageId: number, level?: string, limit: number = 50) {
        if (level) {
            return await sql`
        SELECT * FROM words 
        WHERE language_id = ${languageId} AND level = ${level}
        LIMIT ${limit}
      `
        }
        return await sql`
      SELECT * FROM words 
      WHERE language_id = ${languageId}
      LIMIT ${limit}
    `
    }

    static async getWordById(id: number) {
        const [word] = await sql`SELECT * FROM words WHERE id = ${id}`
        return word
    }
}
