import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import QuizPage from './pages/QuizPage'
import CommunityPage from './pages/CommunityPage'
import LearningPage from './pages/LearningPage'
import AdminPanel from './pages/AdminPanel'
import LoginPage from './pages/LoginPage'
import GoogleCallback from './pages/GoogleCallback'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="learn" element={<LearningPage />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
