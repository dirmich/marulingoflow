import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="quiz" element={<div className="p-8 text-center text-2xl">퀴즈 기능 준비 중...</div>} />
            <Route path="community" element={<div className="p-8 text-center text-2xl">커뮤니티 기능 준비 중...</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
