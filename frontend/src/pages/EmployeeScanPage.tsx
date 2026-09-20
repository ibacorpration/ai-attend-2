import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { CameraScanView } from '@/features/recognition/CameraScanView';
import { Card } from '@/components/ui/Card';

export default function EmployeeScanPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card variant="glass" style={{ width: '100%', maxWidth: '500px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <ArrowLeft size={20} /> Back
            </button>
          </div>
          <CameraScanView />
        </motion.div>
      </Card>
    </div>
  );
}
