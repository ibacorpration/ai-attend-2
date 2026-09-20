import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ReviewActionButtons } from './ReviewActionButtons';

export interface ReviewItem {
  id: number;
  employeeName: string;
  date: string;
  type: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ReviewQueueTableProps {
  items: ReviewItem[];
  onAction: (id: number, action: 'approve' | 'reject') => void;
}

export const ReviewQueueTable: React.FC<ReviewQueueTableProps> = ({ items, onAction }) => {
  return (
    <Card>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Review Queue</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Pending actions requiring admin approval.</p>
      </div>

      <Table headers={['Employee', 'Request', 'Reason', 'Status', 'Actions']}>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell><strong>{item.employeeName}</strong></TableCell>
            <TableCell>{item.type}<br/><small style={{ color: 'var(--text-secondary)' }}>{item.date}</small></TableCell>
            <TableCell>{item.reason}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'pending' ? 'warning' : item.status === 'approved' ? 'success' : 'error'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              {item.status === 'pending' ? (
                <ReviewActionButtons onApprove={() => onAction(item.id, 'approve')} onReject={() => onAction(item.id, 'reject')} />
              ) : (
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Resolved</span>
              )}
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No pending reviews.
            </td>
          </TableRow>
        )}
      </Table>
    </Card>
  );
};
