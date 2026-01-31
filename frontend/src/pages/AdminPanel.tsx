import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Users, Shield, Activity, Search } from 'lucide-react'

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<any[]>([])
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/admin/stats')
                const usersRes = await api.get('/admin/users')
                setStats(statsRes.data)
                setUsers(usersRes.data.users)
            } catch (e) {
                console.error('Admin data fetch error', e)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex items-center gap-3">
                <Shield className="text-red-500 w-8 h-8" />
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">System Administrator</h1>
            </header>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatBox label="Total Users" value={stats.total_users} icon={<Users className="text-blue-400" />} />
                    <StatBox label="Total Words" value={stats.total_words} icon={<Activity className="text-green-400" />} />
                    <StatBox label="Active (24h)" value={stats.active_24h} icon={<Search className="text-yellow-400" />} />
                </div>
            )}

            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-100 italic">User Management</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="bg-slate-800 text-sm py-2 pl-10 pr-4 rounded-full border-none focus:ring-2 focus:ring-red-500 transition-all text-slate-200"
                        />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                        <tr>
                            <th className="p-4">Email</th>
                            <th className="p-4">Nickname</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-right">Registered</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4 text-slate-300 font-medium">{user.email}</td>
                                <td className="p-4 text-slate-400">{user.nickname}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-slate-500 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

const StatBox: React.FC<{ label: string, value: any, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between shadow-xl">
        <div>
            <p className="text-xs text-slate-500 uppercase font-black mb-1">{label}</p>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">{icon}</div>
    </div>
)

export default AdminPanel
