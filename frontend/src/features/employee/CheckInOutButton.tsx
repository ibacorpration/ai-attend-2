import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CheckInOutButtonProps {
  isCheckedIn: boolean;
  onToggle: () => void;
}

export const CheckInOutButton: React.FC<CheckInOutButtonProps> = ({ isCheckedIn, onToggle }) => {
  return (
    <Button 
      onClick={onToggle}
      style={{ 
        width: '100%', 
        background: isCheckedIn ? 'var(--error)' : 'var(--success)',
        color: 'white',
        padding: '1.25rem',
        fontSize: '1.125rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem'
      }}
    >
      {isCheckedIn ? <LogOut /> : <LogIn />}
      {isCheckedIn ? 'Check Out Now' : 'Manual Check In'}
    </Button>
  );
};
