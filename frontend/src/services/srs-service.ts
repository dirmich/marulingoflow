import api from './api'

export const srsService = {
    getTodayWords: async () => {
        const { data } = await api.get('/srs/words/today')
        return data.words
    },
    submitReview: async (wordId: number, quality: number) => {
        const { data } = await api.post('/srs/review', { word_id: wordId, quality })
        return data
    },
}
