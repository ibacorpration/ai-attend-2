import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Bell, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmployeeStatCard } from '@/features/employee/EmployeeStatCard';
import { SalaryCard } from '@/features/employee/SalaryCard';
import { AttendanceHistoryList } from '@/features/employee/AttendanceHistoryList';
import { MessageInbox } from '@/features/messages/MessageInbox';
import { messageService } from '@/services/messageService';
import { Message } from '@/types/message';

export default function EmployeeProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state?.employee;

  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    if (!employeeData?.employee_id) {
      navigate('/');
      return;
    }
    const fetchMessages = async () => {
      try {
        const data = await messageService.getEmployeeMessages(employeeData.employee_id);
        setMessages(data);
      } catch (err) {}
    };
    fetchMessages();
  }, [employeeData, navigate]);

  const handleMarkAsRead = async (msgId: number) => {
    try {
      await messageService.markAsRead(employeeData.employee_id, msgId);
      setMessages(messages.map(m => m.id === msgId ? { ...m, read_at: new Date().toISOString() } : m));
    } catch (err) {}
  };

  if (!employeeData) return null;
  const unreadCount = messages.filter(m => !m.read_at).length;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 style={{ fontSize: '1.875rem' }}>Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{employeeData.full_name}</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>{employeeData.department} • {employeeData.employee_code}</p>
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => setShowMessages(!showMessages)}
            style={{ position: 'relative', padding: '0.5rem', background: 'var(--surface-color)', borderRadius: '50%', border: '1px solid #e5e7eb' }}
          >
            <Bell color="var(--text-secondary)" />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--error)', color: 'white', fontSize: '0.75rem', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>
          
          <button onClick={() => navigate('/')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Exit
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <EmployeeStatCard title="Current Status" value={employeeData.employee_status === 'active' ? 'Checked In' : 'Checked Out'} icon={<CheckCircle />} />
        <EmployeeStatCard title="Hours Today" value="--:--" icon={<Clock />} />
        <SalaryCard salary={employeeData.salary} />
      </div>

      {showMessages ? (
        <MessageInbox messages={messages} onMarkAsRead={handleMarkAsRead} />
      ) : (
        <AttendanceHistoryList employeeId={employeeData.employee_id} />
      )}
    </div>
  );
}
