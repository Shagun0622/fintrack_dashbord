// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Wallet, UserCircle, Shield, Eye } from 'lucide-react';

const NAV = [
  { to: '/',             Icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/transactions', Icon: ArrowLeftRight,   label: 'Transactions' },
  { to: '/insights',     Icon: Lightbulb,        label: 'Insights'     },
];

export default function Sidebar({ isOpen, onClose }) {
  const { role, setRole } = useApp();
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Wallet size={20} strokeWidth={2} />
          </div>
          <div>
            <div className="logo-name">FinTrack</div>
            <div className="logo-tag">Finance Dashboard</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-lbl">Main Menu</div>
          {NAV.map(({ to, Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-ico"><Icon size={17} strokeWidth={1.8} /></span>
              {label}
            </NavLink>
          ))}
        </nav>

       

        <div className="sidebar-bottom">
          <div className="role-sw">
            <div className="role-sw-lbl">Switch Role</div>
            <div className="role-tabs">
              <button
                className={`role-tab ${role === 'viewer' ? 'on' : ''}`}
                onClick={() => setRole('viewer')}
              >Viewer</button>
              <button
                className={`role-tab adm ${role === 'admin' ? 'on' : ''}`}
                onClick={() => setRole('admin')}
              >Admin</button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
