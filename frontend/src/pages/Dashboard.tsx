import React from 'react'
import { Sparkles, Calendar, Zap, BookOpen } from 'lucide-react'

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold flex items-center gap-2">
                    안녕하세요, 학습자님! <Sparkles className="text-yellow-400" />
                </h1>
                <p className="text-slate-400">오늘도 목표를 향해 한 걸음 더 나아가 볼까요?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Calendar className="text-blue-400" />} label="학습 기간" value="12일째" />
                <StatCard icon={<Zap className="text-yellow-400" />} label="연속Streak" value="5일" />
                <StatCard icon={<BookOpen className="text-green-400" />} label="학습한 단어" value="124개" />
                <StatCard icon={<Zap className="text-purple-400" />} label="현재 레벨" value="LV. 3" />
            </div>

            <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col items-center text-center gap-4">
                <h2 className="text-2xl font-bold">오늘 복습할 단어가 있습니다</h2>
                <p className="opacity-90">망각곡선이 들이치기 전에 복습하여 장기 기억으로 전환하세요!</p>
                <Link to="/learn" className="mt-4 px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-slate-100 transition-transform hover:scale-105">
                    복습 시작하기
                </Link>
            </section>
        </div>
    )
}

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-slate-800 rounded-lg">{icon}</div>
        <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-xl font-bold text-slate-100">{value}</p>
        </div>
    </div>
)

export default Dashboard
