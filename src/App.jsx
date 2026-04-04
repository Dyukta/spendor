import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}