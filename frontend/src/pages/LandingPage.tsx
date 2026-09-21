
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanFace } from 'lucide-react';
import { RoleSelectorCard } from '@/features/role-selector/RoleSelectorCard';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'employee' | 'admin') => {
    if (role === 'employee') navigate('/scan');
    else if (role === 'admin') navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ zIndex: 1, textAlign: 'center', marginBottom: '2rem' }}>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--surface-color)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem' }}>
            <ScanFace size={48} color="var(--accent-primary)" />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
            FaceAttend AI
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Secure, frictionless attendance.
          </p>
        </motion.div>
      </div>

      <Card variant="glass" style={{ width: '100%', maxWidth: '400px' }}>
        <RoleSelectorCard onSelectRole={handleSelectRole} />
      </Card>
    </div>
  );
}
