import React from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background soft blob */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--accent-light) 0%, rgba(250,250,251,0) 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.6,
      }} className="animate-pulse-slow" />
      
      <div style={{ zIndex: 1, width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};
