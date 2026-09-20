import React from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';

interface SalaryCardProps {
  salary: number | null | undefined;
}

export const SalaryCard: React.FC<SalaryCardProps> = ({ salary }) => {
  if (salary === null || salary === undefined) return null;

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', color: 'var(--warning)' }}>
          <Calendar />
        </div>
        <h3 style={{ fontSize: '1.125rem' }}>Salary</h3>
      </div>
      <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>${salary.toLocaleString()}</p>
    </Card>
  );
};
