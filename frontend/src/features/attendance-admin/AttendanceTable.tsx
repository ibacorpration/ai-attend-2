import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';

// Mock Type
interface AttendanceRecord {
  id: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'absent';
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  return (
    <Card>
      <Table headers={['Employee', 'Date', 'Check In', 'Check Out', 'Status']}>
        {records.map(record => (
          <TableRow key={record.id}>
            <TableCell><strong>{record.employeeName}</strong></TableCell>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.checkIn || '-'}</TableCell>
            <TableCell>{record.checkOut || '-'}</TableCell>
            <TableCell>
              <Badge variant={record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'error'}>
                {record.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
        {records.length === 0 && (
          <TableRow>
            <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No attendance records found.
            </td>
          </TableRow>
        )}
      </Table>
    </Card>
  );
};
