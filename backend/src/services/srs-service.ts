import sql from '../db'

export class SrsService {
    /**
     * SM-2 알고리즘을 사용하여 단어 학습 상태를 업데이트합니다.
     * q (quality): 0-5
     * 5: 완벽히 기억 / 4: 약간 고민했지만 기억 / 3: 어렵게 기억 / 2: 틀렸지만 아는 단어 / 1: 모르겠음 / 0: 아예 처음 봄
     */
    static async updateSrsState(userId: string, wordId: number, quality: number) {
        const [currentState] = await sql`
      SELECT * FROM srs_states WHERE user_id = ${userId} AND word_id = ${wordId}
    `

        let { interval, ease_factor, repetition } = currentState || {
            interval: 0,
            ease_factor: 2.5,
            repetition: 0
        }

        if (quality >= 3) {
            if (repetition === 0) {
                interval = 1
            } else if (repetition === 1) {
                interval = 6
            } else {
                interval = Math.round(interval * ease_factor)
            }
            repetition += 1
        } else {
            repetition = 0
            interval = 1
        }

        ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        if (ease_factor < 1.3) ease_factor = 1.3

        const nextReviewAt = new Date()
        nextReviewAt.setDate(nextReviewAt.getDate() + interval)

        if (currentState) {
            return await sql`
        UPDATE srs_states SET
          interval = ${interval},
          ease_factor = ${ease_factor},
          repetition = ${repetition},
          next_review_at = ${nextReviewAt},
          last_reviewed_at = CURRENT_TIMESTAMP
        WHERE id = ${currentState.id}
        RETURNING *
      `
        } else {
            return await sql`
        INSERT INTO srs_states (user_id, word_id, interval, ease_factor, repetition, next_review_at, last_reviewed_at)
        VALUES (${userId}, ${wordId}, ${interval}, ${ease_factor}, ${repetition}, ${nextReviewAt}, CURRENT_TIMESTAMP)
        RETURNING *
      `
        }
    }

    static async getTodayWords(userId: string) {
        return await sql`
      SELECT w.*, s.next_review_at
      FROM words w
      LEFT JOIN srs_states s ON w.id = s.word_id AND s.user_id = ${userId}
      WHERE s.next_review_at IS NULL OR s.next_review_at <= CURRENT_TIMESTAMP
      ORDER BY s.next_review_at ASC NULLS FIRST
      LIMIT 20
    `
    }
}
