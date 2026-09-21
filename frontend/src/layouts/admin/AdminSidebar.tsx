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
          className="fixed inset-0 bg-ink/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 w-[280px] bg-ink border-r border-ink z-50 flex flex-col
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-surface">FaceAttend AI</h2>
          <button onClick={onClose} className="lg:hidden text-surface/70 hover:text-surface">
            <X />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl font-medium w-full text-left transition-colors relative
                ${isActive ? 'bg-surface text-ink shadow-sm' : 'text-surface/70 hover:bg-surface/10 hover:text-surface'}
              `}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-surface/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 text-danger-main hover:bg-danger-main/10 rounded-xl w-full transition-colors font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};
