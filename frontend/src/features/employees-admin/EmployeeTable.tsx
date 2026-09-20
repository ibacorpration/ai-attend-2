import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Employee } from '@/types/employee';

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <Card style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <h3>Employee Directory</h3>
        <Button icon={<Plus size={18} />}>Add New</Button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB', color: 'var(--text-secondary)' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Department</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '1rem' }}>{emp.employee_code}</td>
              <td style={{ padding: '1rem', fontWeight: 500 }}>{emp.full_name}</td>
              <td style={{ padding: '1rem' }}>{emp.department || '-'}</td>
              <td style={{ padding: '1rem' }}>
                <Badge variant={emp.status === 'active' ? 'success' : 'error'}>
                  {emp.status}
                </Badge>
              </td>
              <td style={{ padding: '1rem' }}>
                {emp.salary ? `$${emp.salary.toLocaleString()}` : '-'}
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};
