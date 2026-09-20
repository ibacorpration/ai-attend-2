import React from 'react';
import { Card } from '@/components/ui/Card';

export const DashboardChart: React.FC = () => {
  const data = [
    { day: 'Mon', present: 45, absent: 5 },
    { day: 'Tue', present: 48, absent: 2 },
    { day: 'Wed', present: 42, absent: 8 },
    { day: 'Thu', present: 49, absent: 1 },
    { day: 'Fri', present: 46, absent: 4 },
  ];

  const maxTotal = 50;

  return (
    <Card style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Attendance Trends (This Week)</h3>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '1rem', paddingTop: '2rem' }}>
        {data.map((item) => (
          <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
            <div style={{ width: '100%', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2px' }}>
              {/* Absent Bar */}
              <div 
                style={{ 
                  width: '100%', 
                  background: 'var(--error)', 
                  height: `${(item.absent / maxTotal) * 100}%`,
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.8
                }} 
                title={`${item.absent} Absent`}
              />
              {/* Present Bar */}
              <div 
                style={{ 
                  width: '100%', 
                  background: 'var(--success)', 
                  height: `${(item.present / maxTotal) * 100}%`,
                  borderRadius: item.absent === 0 ? '4px 4px 0 0' : '0',
                }} 
                title={`${item.present} Present`}
              />
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--success)' }} /> Present
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--error)', opacity: 0.8 }} /> Absent
        </div>
      </div>
    </Card>
  );
};
