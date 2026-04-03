// src/components/Topbar.jsx
import { useApp } from '../context/AppContext';
import { Sun, Moon, Menu, Shield, Eye } from 'lucide-react';

export default function Topbar({ title, subtitle, onMenuClick }) {
  const { role, theme, setTheme } = useApp();
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      <div className="topbar-right">
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark'
            ? <Sun size={16} strokeWidth={2} />
            : <Moon size={16} strokeWidth={2} />}
        </button>
        <div className={`role-pill ${role}`}>
          <span className="pip" />
          {role === 'admin'
            ? <><Shield size={11} style={{ marginRight: 4 }} />Admin</>
            : <><Eye size={11} style={{ marginRight: 4 }} />Viewer</>}
        </div>
        <button className="menu-btn" onClick={onMenuClick} aria-label="Menu">
          <Menu size={18} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
