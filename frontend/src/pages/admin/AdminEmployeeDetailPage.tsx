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
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/employees')} 
          className="text-ink/60 hover:text-ink transition-colors p-2 -ml-2 rounded-lg hover:bg-surface"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-ink">Employee Profile</h2>
      </div>

      <Card>
        <div className="flex justify-between items-start flex-wrap gap-6">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-20 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
              <User size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1 text-ink">{employee.full_name}</h2>
              <p className="text-ink/70 font-medium">{employee.employee_code} • {employee.department}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="flat" onClick={() => setIsEditOpen(true)}>Edit Details</Button>
            <Button color="primary" icon={<Camera size={18} />} onClick={() => setIsEnrollOpen(true)}>Enroll Face</Button>
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
