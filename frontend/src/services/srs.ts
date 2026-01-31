import { useQuery } from '@tanstack/react-query'
import api from './api'

export interface UserStats {
    total_words: number
    due_count: number
    level: number
    streak: number
}

export const useUserStats = () => {
    return useQuery<UserStats>({
        queryKey: ['userStats'],
        queryFn: async () => {
            const { data } = await api.get<UserStats>('/srs/stats')
            return data
        }
    })
}
