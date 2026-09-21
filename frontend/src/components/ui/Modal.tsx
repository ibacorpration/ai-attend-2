import React from 'react';
import { Modal as HeroModal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <HeroModal 
      isOpen={isOpen} 
      onOpenChange={(open) => !open && onClose()} 
      backdrop="blur"
      placement="center"
      classNames={{
        backdrop: "bg-[#141414]/55 backdrop-blur-md",
        base: "bg-surface" // uses the theme color
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="border-b border-border-light text-ink font-semibold text-xl px-6 py-4">
              {title}
            </ModalHeader>
            <ModalBody className="p-6 max-h-[70vh] overflow-y-auto">
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
};
