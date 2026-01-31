import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react'

const LoginPage: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleDevLogin = async () => {
        setIsLoggingIn(true)
        try {
            const response = await api.post('/auth/dev-login', { email: 'dev@example.com' })
            const { access_token, refresh_token, user } = response.data
            login(access_token, refresh_token, user)
            navigate('/')
        } catch (error) {
            console.error('Login failed', error)
            alert('Login failed. Please check backend status.')
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleGoogleLogin = () => {
        // Redirect to backend google auth
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/google`
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6 group hover:scale-110 transition-transform">
                        <LogIn className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
                        Maru LingoFlow <Sparkles className="text-yellow-400 w-5 h-5" />
                    </h1>
                    <p className="text-slate-400">당신의 언어 학습을 가속화하세요</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoggingIn}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl transition-all hover:translate-y-[-2px] active:scale-95 disabled:opacity-50"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Google로 계속하기
                    </button>

                    <div className="relative py-4 flex items-center">
                        <div className="flex-grow border-t border-slate-800"></div>
                        <span className="flex-shrink mx-4 text-xs text-slate-600 uppercase tracking-widest font-bold">OR</span>
                        <div className="flex-grow border-t border-slate-800"></div>
                    </div>

                    <button
                        onClick={handleDevLogin}
                        disabled={isLoggingIn}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl border border-slate-700 transition-all hover:translate-y-[-2px] active:scale-95 disabled:opacity-50 group"
                    >
                        {isLoggingIn ? (
                            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                        )}
                        Developer Login (Test)
                    </button>
                </div>

                <footer className="mt-12 text-center">
                    <p className="text-xs text-slate-600">
                        로그인함으로써 귀하는 서비스 약관 및 <br />
                        개인정보 처리방침에 동의하게 됩니다.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default LoginPage
