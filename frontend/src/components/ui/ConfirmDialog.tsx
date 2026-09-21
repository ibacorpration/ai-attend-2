import React, { useRef } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', isDestructive = false
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
      );
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div ref={contentRef}>
        <p className="text-ink/70 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button variant="flat" onClick={onClose}>{cancelText}</Button>
          <Button 
            variant="solid"
            color={isDestructive ? 'danger' : 'primary'}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
