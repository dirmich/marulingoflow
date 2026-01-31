import api from './api'

export const quizService = {
    getQuizzes: async (languageId: number) => {
        const { data } = await api.get(`/quiz?language_id=${languageId}`)
        return data.quizzes
    },
    getDynamicQuiz: async (languageId: number, count: number = 10) => {
        const { data } = await api.get(`/quiz/dynamic?language_id=${languageId}&count=${count}`)
        return data.questions
    },
    submitResult: async (quizId: number, score: number, totalQuestions: number) => {
        const { data } = await api.post(`/quiz/${quizId}/submit`, { score, total_questions: totalQuestions })
        return data
    },
}
