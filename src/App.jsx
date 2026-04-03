// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar      from './components/Sidebar';
import Dashboard    from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights     from './pages/Insights';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-area">
        <Routes>
          <Route
            path="/"
            element={<Dashboard onMenuClick={() => setSidebarOpen(o => !o)} />}
          />
          <Route
            path="/transactions"
            element={<Transactions onMenuClick={() => setSidebarOpen(o => !o)} />}
          />
          <Route
            path="/insights"
            element={<Insights onMenuClick={() => setSidebarOpen(o => !o)} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
