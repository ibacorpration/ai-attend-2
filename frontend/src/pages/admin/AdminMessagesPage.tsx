import React, { useEffect, useState } from 'react';
import { AdminMessageComposer } from '@/features/messages/AdminMessageComposer';
import { employeeService } from '@/services/employeeService';
import { Employee } from '@/types/employee';
import { useToast } from '@/context/ToastContext';

export default function AdminMessagesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    employeeService.getAll()
      .then(data => setEmployees(data))
      .catch(() => showToast('Failed to load employees for messaging', 'ERROR'));
  }, [showToast]);

  return (
    <div>
      <AdminMessageComposer employees={employees} />
    </div>
  );
}
