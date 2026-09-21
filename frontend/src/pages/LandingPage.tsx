import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace } from 'lucide-react';
import { RoleSelectorCard } from '@/features/role-selector/RoleSelectorCard';
import { Card } from '@/components/ui/Card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function LandingPage() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  const handleSelectRole = (role: 'employee' | 'admin') => {
    if (role === 'employee') navigate('/scan');
    else if (role === 'admin') navigate('/admin/login');
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={headerRef} className="z-10 text-center mb-12 flex flex-col items-center">
        <div className="inline-flex p-4 bg-surface rounded-full shadow-sm mb-6 text-accent-primary">
          <ScanFace size={48} />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-2 text-ink">
          FaceAttend AI
        </h1>
        <p className="text-ink/70 text-lg font-medium">
          Secure, frictionless attendance.
        </p>
      </div>

      <Card variant="glass" className="w-full max-w-md">
        <RoleSelectorCard onSelectRole={handleSelectRole} />
      </Card>
    </div>
  );
}
