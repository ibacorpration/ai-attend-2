import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RoleSelectorCardProps {
  onSelectRole: (role: 'employee' | 'admin') => void;
}

export const RoleSelectorCard: React.FC<RoleSelectorCardProps> = ({ onSelectRole }) => {
  return (
    <motion.div
      key="selector"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <h2 style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>Select your role</h2>
      <Button 
        variant="secondary"
        onClick={() => onSelectRole('employee')}
        style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem', fontSize: '1.125rem' }}
      >
        <User /> Employee Check-in
      </Button>
      <Button 
        variant="secondary"
        onClick={() => onSelectRole('admin')}
        style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem', fontSize: '1.125rem' }}
      >
        <Shield /> Admin Access
      </Button>
    </motion.div>
  );
};
