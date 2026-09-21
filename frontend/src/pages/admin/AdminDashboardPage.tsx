import { useEffect, useState } from 'react';
import { StatsGrid } from '@/features/dashboard/StatsGrid';
import { employeeService } from '@/services/employeeService';
import { useToast } from '@/context/ToastContext';

export default function AdminDashboardPage() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    employeeService.getAll()
      .then(data => setTotalEmployees(data.length))
      .catch(() => showToast('Failed to load stats', 'ERROR'));
  }, [showToast]);

  return (
    <div>
      <StatsGrid totalEmployees={totalEmployees} />
    </div>
  );
}
