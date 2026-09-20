import React from 'react';
import { Check, X } from 'lucide-react';

interface ReviewActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
}

export const ReviewActionButtons: React.FC<ReviewActionButtonsProps> = ({ onApprove, onReject }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button 
        onClick={onApprove}
        style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '0.25rem', display: 'flex', alignItems: 'center' }}
        title="Approve"
      >
        <Check size={16} />
      </button>
      <button 
        onClick={onReject}
        style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '0.25rem', display: 'flex', alignItems: 'center' }}
        title="Reject"
      >
        <X size={16} />
      </button>
    </div>
  );
};
