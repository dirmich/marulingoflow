import React, { useState } from 'react'
import { LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export const UserMenu: React.FC = () => {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if (!user) {
        return (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                로그인
            </Link>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user.nickname?.[0] || user.email[0]}
                </div>
                <span className="hidden md:block font-medium dark:text-slate-200 text-slate-700">{user.nickname}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-medium dark:text-white">{user.nickname}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                        <Settings size={16} />
                        설정 (준비중)
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        로그아웃
                    </button>
                </div>
            )}
        </div>
    )
}
