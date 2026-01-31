import React from 'react'
import { Trophy, HelpCircle, Play, Globe } from 'lucide-react'

const QuizPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold flex items-center gap-2">
                    퀴즈 챌린지 <HelpCircle className="text-blue-500" />
                </h1>
                <p className="text-slate-400">학습한 내용을 퀴즈로 테스트하고 실력을 뽐내보세요!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuizCard
                    title="Daily Vocab Challenge"
                    description="오늘 배운 단어 10개로 구성된 기초 퀴즈"
                    icon={<Trophy className="text-yellow-500" />}
                    participants={128}
                />
                <QuizCard
                    title="Grammar Master"
                    description="중급 학습자를 위한 문법 완성 퀴즈"
                    icon={<Globe className="text-green-500" />}
                    participants={45}
                />
                <QuizCard
                    title="Dynamic Random Quiz"
                    description="모든 단어 중 랜덤하게 20문항 생성"
                    icon={<Play className="text-blue-500" />}
                    participants={312}
                />
            </div>

            <section className="mt-12 p-8 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center gap-4 bg-slate-900/50">
                <div className="p-4 bg-blue-500/10 rounded-full text-blue-400 mb-2">
                    <Trophy size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white">다음 실시간 대회 예고</h2>
                <p className="text-slate-400 max-w-md">
                    매일 저녁 9시, 전 세계 학습자들과 실시간으로 경쟁하세요! <br />
                    <strong>오늘의 종목: 일본어 N5 단어 배틀</strong>
                </p>
                <div className="flex gap-4 mt-4">
                    <button className="px-6 py-2 bg-slate-800 text-slate-300 rounded-full font-bold hover:bg-slate-700">미리보기</button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500">대기 등록</button>
                </div>
            </section>
        </div>
    )
}

const QuizCard: React.FC<{ title: string, description: string, icon: React.ReactNode, participants: number }> = ({ title, description, icon, participants }) => (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                {icon}
            </div>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Users size={12} /> {participants}명 참여 중
            </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-6">{description}</p>
        <button className="w-full py-3 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-xl font-bold transition-all">
            시작하기
        </button>
    </div>
)

const Users: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
)

export default QuizPage
