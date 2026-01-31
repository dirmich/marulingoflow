import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Trophy, Users, LayoutDashboard, User } from 'lucide-react'

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full h-16 bg-slate-900 text-white border-b border-slate-800 z-50 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-blue-400">
                <BookOpen className="w-8 h-8" />
                <span>Lingo-Flow</span>
            </div>

            <div className="flex gap-6">
                <NavLink to="/" icon={<LayoutDashboard size={20} />} label="대시보드" />
                <NavLink to="/quiz" icon={<Trophy size={20} />} label="퀴즈" />
                <NavLink to="/community" icon={<Users size={20} />} label="커뮤니티" />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-slate-800">
                    <User size={24} />
                </button>
            </div>
        </nav>
    )
}

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
        {icon}
        <span className="hidden md:inline font-medium">{label}</span>
    </Link>
)

export default Navbar
