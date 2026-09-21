import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageTransition } from '@/components/ui/PageTransition';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-canvas text-ink">
      {/* Background soft blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)' }}
      />
      
      <div className="z-10 w-full flex flex-col items-center">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};
