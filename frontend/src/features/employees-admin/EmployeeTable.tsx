import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Employee } from '@/types/employee';

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <Card style={{ overflowX: 'auto' }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-ink">Employee Directory</h3>
        <Button icon={<Plus size={18} />}>Add New</Button>
      </div>
      
      <Table headers={['ID', 'Name', 'Department', 'Status', 'Salary']}>
        {(Array.isArray(employees) ? employees : []).map(emp => (
          <TableRow key={emp.id}>
            <TableCell>{emp.employee_code}</TableCell>
            <TableCell><span className="font-medium text-ink">{emp.full_name}</span></TableCell>
            <TableCell>{emp.department || '-'}</TableCell>
            <TableCell>
              <Badge variant={emp.status === 'active' ? 'success' : 'error'}>
                {emp.status}
              </Badge>
            </TableCell>
            <TableCell>
              {emp.salary ? `$${emp.salary.toLocaleString()}` : '-'}
            </TableCell>
          </TableRow>
        ))}
        {(!Array.isArray(employees) || employees.length === 0) && (
          <TableRow>
            <TableCell>No employees found.</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
          </TableRow>
        )}
      </Table>
    </Card>
  );
};
