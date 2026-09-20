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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          value={formData.salary || 0} 
          onChange={e => setFormData({...formData, salary: Number(e.target.value)})} 
        />
        <div>
          <label className="label">Status</label>
          <select 
            className="input-field" 
            value={formData.status} 
            onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Employee</Button>
        </div>
      </form>
    </Modal>
  );
};
