import React from 'react';
import { Chip, ChipProps } from '@heroui/react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
  const colorMap: Record<string, ChipProps['color']> = {
    success: 'success', 
    error: 'danger', 
    warning: 'warning', 
    info: 'primary'
  };
  
  return (
    <Chip color={colorMap[variant] || 'primary'} variant="flat" size="sm">
      {children}
    </Chip>
  );
};
