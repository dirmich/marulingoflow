import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Navbar />
            <main className="container mx-auto pt-24 pb-12 px-4 min-h-[calc(100vh-4rem)]">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
