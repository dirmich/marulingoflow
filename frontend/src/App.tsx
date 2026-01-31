import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import QuizPage from './pages/QuizPage'
import CommunityPage from './pages/CommunityPage'
import LearningPage from './pages/LearningPage'
import AdminPanel from './pages/AdminPanel'
import LoginPage from './pages/LoginPage'
import GoogleCallback from './pages/GoogleCallback'
import LandingPage from './pages/LandingPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<GoogleCallback />} />

              {/* Protected Routes (Dashboard) */}
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="quiz" element={<QuizPage />} />
                  <Route path="community" element={<CommunityPage />} />
                  <Route path="learn" element={<LearningPage />} />
                  <Route path="admin" element={<AdminPanel />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
