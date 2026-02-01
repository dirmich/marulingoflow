import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Trophy, Users, LayoutDashboard } from 'lucide-react'

import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 px-4 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
                <BookOpen className="w-8 h-8" />
                <span>Maru LingoFlow</span>
            </div>

            <div className="flex gap-6">
                <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="대시보드" />
                <NavLink to="/dashboard/quiz" icon={<Trophy size={20} />} label="퀴즈" />
                <NavLink to="/dashboard/community" icon={<Users size={20} />} label="커뮤니티" />
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserMenu />
            </div>
        </nav>
    )
}

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            to={to}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
        >
            {icon}
            <span className="hidden md:inline font-medium">{label}</span>
        </Link>
    )
}

export default Navbar
