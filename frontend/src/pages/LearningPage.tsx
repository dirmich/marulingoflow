import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { srsService } from '../services/srs-service'
import Flashcard from '../components/Flashcard'
import { ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const LearningPage: React.FC = () => {
    const queryClient = useQueryClient()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const { data: words, isLoading } = useQuery({
        queryKey: ['todayWords'],
        queryFn: srsService.getTodayWords,
    })

    const reviewMutation = useMutation({
        mutationFn: ({ wordId, quality }: { wordId: number, quality: number }) =>
            srsService.submitReview(wordId, quality),
        onSuccess: () => {
            if (words && currentIndex < words.length - 1) {
                setCurrentIndex(currentIndex + 1)
            } else {
                setIsFinished(true)
            }
            queryClient.invalidateQueries({ queryKey: ['todayWords'] })
        }
    })

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-slate-400 font-medium">오늘의 단어를 명상하며 불러오는 중...</p>
        </div>
    )

    if (!words || words.length === 0 || isFinished) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in zoom-in duration-500">
            <div className="p-6 bg-green-500/10 rounded-full text-green-400">
                <CheckCircle2 size={64} />
            </div>
            <h2 className="text-3xl font-bold text-white">오늘의 학습을 마쳤습니다!</h2>
            <p className="text-slate-400 max-w-sm">
                모든 복습이 완료되었습니다. 내일 다시 새로운 단어들이 찾아올 거예요.
            </p>
            <Link to="/" className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
                대시보드로 돌아가기
            </Link>
        </div>
    )

    const currentWord = words[currentIndex]

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
                    <ChevronLeft size={20} />
                    <span>중단하기</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="h-2 w-48 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-sm font-bold text-slate-400">{currentIndex + 1} / {words.length}</span>
                </div>
            </header>

            <Flashcard
                word={currentWord.text}
                meaning={currentWord.meaning}
                phonetic={currentWord.phonetic}
                onReview={(quality) => reviewMutation.mutate({ wordId: currentWord.id, quality })}
            />
        </div>
    )
}

export default LearningPage
