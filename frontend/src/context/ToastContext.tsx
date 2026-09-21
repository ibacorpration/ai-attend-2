import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export type ToastType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastItem: React.FC<{ toast: Toast, onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  useGSAP(() => {
    if (elRef.current && !isExiting) {
      gsap.fromTo(elRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  }, [isExiting]);

  useEffect(() => {
    if (isExiting && elRef.current) {
      gsap.to(elRef.current, {
        opacity: 0, scale: 0.9, y: -20, duration: 0.3, ease: 'power2.in',
        onComplete: () => onRemove(toast.id)
      });
    }
  }, [isExiting, onRemove, toast.id]);

  useEffect(() => {
    if (toast.type !== 'ERROR') {
      const timer = setTimeout(() => setIsExiting(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.type]);

  const getToastStyle = (type: ToastType) => {
    switch (type) {
      case 'SUCCESS': return { color: '#10b981', icon: '✓' };
      case 'ERROR': return { color: '#ef4444', icon: '✕' };
      case 'WARNING': return { color: '#f59e0b', icon: '!' };
      case 'INFO': return { color: '#3b82f6', icon: 'i' };
    }
  };

  const style = getToastStyle(toast.type);

  return (
    <div
      ref={elRef}
      className="bg-surface/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 pointer-events-auto mt-4 border border-surface/20"
      style={{ borderLeftColor: style.color, borderLeftWidth: '4px' }}
    >
      <div 
        className="w-6 h-6 rounded-full text-white flex items-center justify-center font-bold text-sm"
        style={{ background: style.color }}
      >
        {style.icon}
      </div>
      <span className="font-medium text-ink">{toast.message}</span>
      {toast.type === 'ERROR' && (
        <button 
          onClick={() => setIsExiting(true)}
          className="ml-4 text-ink/50 hover:text-ink cursor-pointer transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'INFO') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-start z-[9999] p-8 pt-20">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
