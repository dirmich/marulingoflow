import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { QuizService } from '../services/quiz-service'

const quiz = new Hono()

quiz.use('*', authMiddleware)

quiz.get('/', async (c) => {
    const languageId = Number(c.req.query('language_id'))
    if (!languageId) return c.json({ error: 'language_id is required' }, 400)

    const quizzes = await QuizService.getQuizzesByLanguage(languageId)
    return c.json({ quizzes })
})

quiz.get('/dynamic', async (c) => {
    const languageId = Number(c.req.query('language_id'))
    const count = Number(c.req.query('count')) || 10

    if (!languageId) return c.json({ error: 'language_id is required' }, 400)

    const questions = await QuizService.generateDynamicQuiz(languageId, count)
    return c.json({ questions })
})

quiz.post('/:id/submit', async (c) => {
    const payload = c.get('jwtPayload') as any
    const userId = payload.sub
    const quizId = Number(c.req.param('id'))
    const { score, total_questions } = await c.req.json()

    const result = await QuizService.submitResult(userId, quizId, score, total_questions)
    return c.json({ success: true, result })
})

export default quiz
