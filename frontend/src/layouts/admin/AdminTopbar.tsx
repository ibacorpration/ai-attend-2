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
    <header className="flex items-center px-6 py-8 mb-4">
      <button onClick={onMenuClick} className="lg:hidden mr-4 text-ink hover:text-accent-primary transition-colors">
        <Menu size={28} />
      </button>
      <h1 className="text-3xl font-bold text-ink tracking-tight">
        {getPageTitle()}
      </h1>
    </header>
  );
};
