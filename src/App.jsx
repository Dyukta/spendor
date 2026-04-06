import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Insights = lazy(() => import("./pages/Insights"));

export default function App() {
  return (
    <HashRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}