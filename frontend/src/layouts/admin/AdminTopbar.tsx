import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (location.pathname === '/admin') return 'Dashboard';
    if (location.pathname.startsWith('/admin/employees')) return 'Employees';
    if (location.pathname.startsWith('/admin/messages')) return 'Messages';
    return 'Admin';
  };

  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', marginBottom: '1rem' }}>
      <button onClick={onMenuClick} className="md-hidden" style={{ marginRight: '1rem' }}>
        <Menu />
      </button>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
        {getPageTitle()}
      </h1>
      
      <style>{`
        @media (min-width: 768px) {
          .md-hidden { display: none !important; }
        }
      `}</style>
    </header>
  );
};
