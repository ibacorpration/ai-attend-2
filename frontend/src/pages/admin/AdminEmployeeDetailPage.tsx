import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Camera } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaceEnrollmentWizard } from '@/features/employees-admin/FaceEnrollmentWizard';
import { EmployeeFormModal } from '@/features/employees-admin/EmployeeFormModal';

export default function AdminEmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Mock employee data
  const employee = {
    id: Number(id),
    full_name: 'John Doe',
    employee_code: 'EMP-001',
    department: 'Engineering',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/admin/employees')} style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2>Employee Profile</h2>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
              <User size={40} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{employee.full_name}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{employee.employee_code} • {employee.department}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>Edit Details</Button>
            <Button icon={<Camera size={18} />} onClick={() => setIsEnrollOpen(true)}>Enroll Face</Button>
          </div>
        </div>
      </Card>

      <FaceEnrollmentWizard 
        isOpen={isEnrollOpen} 
        onClose={() => setIsEnrollOpen(false)} 
        employeeName={employee.full_name} 
      />

      <EmployeeFormModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSave={() => {}} 
        employee={employee} 
      />
    </div>
  );
}
