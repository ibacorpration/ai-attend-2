import { useEffect, useState } from 'react';
import { EmployeeTable } from '@/features/employees-admin/EmployeeTable';
import { employeeService } from '@/services/employeeService';
import { Employee } from '@/types/employee';
import { useToast } from '@/context/ToastContext';

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    employeeService.getAll()
      .then(data => setEmployees(data))
      .catch(() => showToast('Failed to load employees', 'ERROR'));
  }, [showToast]);

  return (
    <div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
