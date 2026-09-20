import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Send, LogOut, X, Calendar, ClipboardCheck, Settings } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: <LayoutDashboard size={20} /> },
    { name: 'Employees', path: '/admin/employees', end: false, icon: <Users size={20} /> },
    { name: 'Attendance', path: '/admin/attendance', end: false, icon: <Calendar size={20} /> },
    { name: 'Review Queue', path: '/admin/reviews', end: false, icon: <ClipboardCheck size={20} /> },
    { name: 'Messages', path: '/admin/messages', end: false, icon: <Send size={20} /> },
    { name: 'Settings', path: '/admin/settings', end: false, icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={onClose}
        />
      )}

      <aside style={{
        position: 'fixed',
        left: isOpen ? 0 : '-100%',
        top: 0, bottom: 0, width: '280px',
        background: 'var(--surface-color)',
        borderRight: '1px solid #E5E7EB',
        transition: 'left 0.3s ease',
        zIndex: 50,
        display: 'flex', flexDirection: 'column',
      }}
      className="md-static" // assumes a global media query handles positioning on desktop
      >
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Admin Panel</h2>
          <button onClick={onClose} className="md-hidden">
            <X />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.75rem 1rem', borderRadius: '0.5rem',
                background: isActive ? 'var(--accent-light)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                width: '100%', textAlign: 'left', textDecoration: 'none'
              })}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #E5E7EB' }}>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: 'var(--error)', width: '100%' }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Basic media query logic injected via style tag for simplicity in this artifact */}
      <style>{`
        @media (min-width: 768px) {
          .md-static { left: 0 !important; position: static !important; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </>
  );
};
