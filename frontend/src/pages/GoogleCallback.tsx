import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const GoogleCallback: React.FC = () => {
    const [searchParams] = useSearchParams()
    const { login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const userStr = searchParams.get('user')

        if (accessToken && refreshToken && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr))
                login(accessToken, refreshToken, user)
                navigate('/', { replace: true })
            } catch (e) {
                console.error('Failed to parse user data', e)
                navigate('/login?error=auth_failed', { replace: true })
            }
        } else {
            navigate('/login?error=missing_params', { replace: true })
        }
    }, [searchParams, login, navigate])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Processing login...</p>
            </div>
        </div>
    )
}

export default GoogleCallback
