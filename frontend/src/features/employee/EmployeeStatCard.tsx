import React from 'react';
import { Card } from '@/components/ui/Card';

interface EmployeeStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export const EmployeeStatCard: React.FC<EmployeeStatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'var(--accent-light)', borderRadius: '0.5rem', color: 'var(--accent-primary)' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '1.125rem' }}>{title}</h3>
      </div>
      <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{value}</p>
    </Card>
  );
};
