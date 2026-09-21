import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface StatsGridProps {
  totalEmployees: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ totalEmployees }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useGSAP(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: totalEmployees,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => setDisplayCount(Math.round(obj.val))
    });
  }, [totalEmployees]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card variant="glass" className="bg-ink text-surface border-none">
        <h3 className="text-surface/70 text-sm font-medium mb-2">Total Employees</h3>
        <p className="text-4xl font-bold text-accent-secondary">{displayCount}</p>
      </Card>
    </div>
  );
};
