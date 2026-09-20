import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
  const getStyles = () => {
    switch(variant) {
      case 'success': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' };
      case 'error': return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' };
      case 'warning': return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' };
      default: return { bg: 'var(--accent-light)', color: 'var(--accent-primary)' };
    }
  };
  
  const styles = getStyles();
  
  return (
    <span style={{ 
      background: styles.bg, 
      color: styles.color,
      padding: '0.25rem 0.75rem', 
      borderRadius: '1rem', 
      fontSize: '0.875rem',
      fontWeight: 500
    }}>
      {children}
    </span>
  );
};
