import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatsGridProps {
  totalEmployees: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ totalEmployees }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
      <Card>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Employees</h3>
        <p style={{ fontSize: '2rem', fontWeight: 700 }}>{totalEmployees}</p>
      </Card>
    </div>
  );
};
