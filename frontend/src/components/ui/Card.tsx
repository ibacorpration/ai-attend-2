import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'surface' | 'glass';
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'surface', 
  className = '',
  style = {}
}) => {
  const baseClass = variant === 'glass' ? 'glass-card' : 'surface-card';
  
  return (
    <div className={`${baseClass} ${className}`} style={{ padding: '1.5rem', ...style }}>
      {children}
    </div>
  );
};
