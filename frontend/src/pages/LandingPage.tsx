import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { ArrowRight, BookOpen, Brain, Globe, Shield } from 'lucide-react'

const LandingPage: React.FC = () => {
    const { user } = useAuth()

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
                        <BookOpen className="w-8 h-8" />
                        <span>Maru LingoFlow</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            로그인
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            자연스러운 <span className="text-blue-600 dark:text-blue-400">언어 습득</span>의 흐름
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
                            과학적인 SRS 반복 학습과 몰입형 퀴즈로 새로운 언어를 가장 효율적으로 마스터하세요.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                                무료로 시작하기 <ArrowRight size={20} />
                            </Link>
                            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                더 알아보기
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img
                            src="/hero-image.png"
                            alt="Language Learning Flow"
                            className="w-full max-w-lg mx-auto drop-shadow-2xl animate-float"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Brain className="w-10 h-10 text-purple-500" />}
                            title="스마트 SRS 학습"
                            description="망각 곡선에 맞춘 자동 복습 시스템으로 기억 효율을 극대화합니다."
                        />
                        <FeatureCard
                            icon={<Globe className="w-10 h-10 text-blue-500" />}
                            title="다양한 언어 지원"
                            description="영어, 스페인어, 일본어 등 다양한 언어 학습을 지원합니다."
                        />
                        <FeatureCard
                            icon={<Shield className="w-10 h-10 text-green-500" />}
                            title="검증된 학습법"
                            description="언어학자와 교육 전문가들이 추천하는 몰입형 학습 방식을 적용했습니다."
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
)

export default LandingPage
