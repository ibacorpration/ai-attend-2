import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { attendanceService, AttendanceRecord } from '@/services/attendanceService';

export const AttendanceHistoryList: React.FC<{ employeeId: number }> = ({ employeeId }) => {
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await attendanceService.getEmployeeAttendance(employeeId);
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [employeeId]);

  return (
    <Card>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent History</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {loading ? <p>Loading history...</p> : history.map((h, i) => (
          <div key={h.id || i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#F9FAFB', borderRadius: '0.5rem', border: '1px solid #E5E7EB' }}>
            <div>
              <p style={{ fontWeight: 600 }}>{h.date}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                In: {h.check_in ? new Date(h.check_in).toLocaleTimeString() : '--'} • 
                Out: {h.check_out ? new Date(h.check_out).toLocaleTimeString() : '--'}
              </p>
            </div>
            <span style={{
              color: h.status === 'present' ? 'var(--success)' : h.status === 'late' ? 'var(--warning)' : 'var(--error)',
              fontWeight: 500,
              textTransform: 'capitalize'
            }}>
              {h.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
