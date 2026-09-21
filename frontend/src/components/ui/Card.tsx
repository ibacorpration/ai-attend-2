import React from 'react';
import { Card as HeroCard, CardBody } from '@heroui/react';

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
  return (
    <HeroCard 
      className={`${variant === 'glass' ? 'bg-surface/50 backdrop-blur-md' : 'bg-surface'} shadow-md rounded-2xl ${className}`}
      style={style}
    >
      <CardBody className="p-6">
        {children}
      </CardBody>
    </HeroCard>
  );
};
