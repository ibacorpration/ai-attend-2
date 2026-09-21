import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

import { useToast } from '@/context/ToastContext';
import { messageService } from '@/services/messageService';
import { Employee } from '@/types/employee';

interface AdminMessageComposerProps {
  employees: Employee[];
}

export const AdminMessageComposer: React.FC<AdminMessageComposerProps> = ({ employees }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [body, setBody] = useState('');
  const { showToast } = useToast();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp || !body) return;
    try {
      await messageService.sendToEmployee(parseInt(selectedEmp), body);
      showToast('Message sent successfully', 'SUCCESS');
      setBody('');
      setSelectedEmp('');
    } catch (err) {
      showToast('Failed to send message', 'ERROR');
    }
  };

  return (
    <Card style={{ maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Send Notification</h3>
      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label className="label">Select Employee</label>
          <select 
            className="input-field"
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.employee_code})</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="label">Message</label>
          <textarea 
            className="input-field" 
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your message here..."
            required
          />
        </div>
        
        <Button type="submit" style={{ alignSelf: 'flex-start' }} icon={<Send size={18} />}>
          Send Message
        </Button>
      </form>
    </Card>
  );
};
