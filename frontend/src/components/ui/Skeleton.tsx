import React from 'react';

export const Skeleton: React.FC<{ className?: string, width?: string | number, height?: string | number, borderRadius?: string | number }> = ({ className = '', width, height, borderRadius = '0.5rem' }) => {
  return (
    <div 
      className={`animate-pulse-slow ${className}`}
      style={{
        width: width || '100%',
        height: height || '1.5rem',
        background: '#E5E7EB',
        borderRadius,
      }}
    />
  );
};
