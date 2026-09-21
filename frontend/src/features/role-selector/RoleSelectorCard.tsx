import React, { useRef } from 'react';
import { Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface RoleSelectorCardProps {
  onSelectRole: (role: 'employee' | 'admin') => void;
}

export const RoleSelectorCard: React.FC<RoleSelectorCardProps> = ({ onSelectRole }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-semibold mb-2 text-ink">Select your role</h2>
      <Button 
        variant="flat"
        color="primary"
        onClick={() => onSelectRole('employee')}
        className="flex justify-center gap-3 py-6 text-lg w-full font-medium shadow-sm hover:shadow-md transition-shadow"
      >
        <User size={24} /> Employee Check-in
      </Button>
      <Button 
        variant="flat"
        color="default"
        onClick={() => onSelectRole('admin')}
        className="flex justify-center gap-3 py-6 text-lg w-full font-medium shadow-sm hover:shadow-md transition-shadow"
      >
        <Shield size={24} /> Admin Access
      </Button>
    </div>
  );
};
