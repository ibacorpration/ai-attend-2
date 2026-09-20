import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
