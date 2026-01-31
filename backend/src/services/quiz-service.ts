import sql from '../db'

export class QuizService {
    static async getQuizzesByLanguage(languageId: number) {
        return await sql`
      SELECT * FROM quizzes WHERE language_id = ${languageId}
    `
    }

    static async getQuizById(id: number) {
        const [quiz] = await sql`SELECT * FROM quizzes WHERE id = ${id}`
        return quiz
    }

    static async submitResult(userId: string, quizId: number, score: number, totalQuestions: number) {
        return await sql`
      INSERT INTO quiz_results (user_id, quiz_id, score, total_questions)
      VALUES (${userId}, ${quizId}, ${score}, ${totalQuestions})
      RETURNING *
    `
    }

    /**
     * 사용자가 선택한 범위(언어, 카테고리 등)에 따라 동적으로 퀴즈 문제를 생성합니다.
     * 실제 구현 시에는 랜덤하게 단어를 뽑아 4지선다형 등으로 구성하는 로직이 들어갑니다.
     */
    static async generateDynamicQuiz(languageId: number, count: number = 10) {
        const words = await sql`
      SELECT * FROM words 
      WHERE language_id = ${languageId} 
      ORDER BY RANDOM() 
      LIMIT ${count}
    `
        return words.map(word => ({
            question: word.text,
            answer: word.meaning,
            options: [word.meaning, '오답1', '오답2', '오답3'].sort(() => Math.random() - 0.5)
        }))
    }
}
