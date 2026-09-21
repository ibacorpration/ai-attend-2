import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Employee } from '@/types/employee';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Employee>) => void;
  employee?: Employee | null;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    full_name: '',
    employee_code: '',
    department: '',
    salary: 0,
    status: 'active'
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({ full_name: '', employee_code: '', department: '', salary: 0, status: 'active' });
    }
  }, [employee, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={employee ? 'Edit Employee' : 'Add Employee'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
        <Input 
          label="Full Name" 
          value={formData.full_name || ''} 
          onChange={e => setFormData({...formData, full_name: e.target.value})} 
          required 
        />
        <Input 
          label="Employee Code" 
          value={formData.employee_code || ''} 
          onChange={e => setFormData({...formData, employee_code: e.target.value})} 
          required 
        />
        <Input 
          label="Department" 
          value={formData.department || ''} 
          onChange={e => setFormData({...formData, department: e.target.value})} 
        />
        <Input 
          label="Salary ($)" 
          type="number"
          value={formData.salary ? formData.salary.toString() : ''} 
          onChange={e => setFormData({...formData, salary: Number(e.target.value)})} 
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink">Status</label>
          <select 
            className="h-10 px-3 rounded-lg border border-surface/20 bg-surface text-ink text-sm outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all" 
            value={formData.status} 
            onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="flat" onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">Save Employee</Button>
        </div>
      </form>
    </Modal>
  );
};
