import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCameraStream } from '@/features/recognition/useCameraStream';

interface FaceEnrollmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
}

export const FaceEnrollmentWizard: React.FC<FaceEnrollmentWizardProps> = ({ isOpen, onClose, employeeName }) => {
  const [step, setStep] = useState(1);
  const { videoRef, cameraError, startCamera, stopCamera } = useCameraStream();

  // Clean up camera when modal closes unexpectedly
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setStep(1);
    }
  }, [isOpen, stopCamera]);

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
      setTimeout(() => startCamera(), 0);
    } else if (step === 2) {
      // Here you would capture the frame and upload it.
      // Mocking the capture delay:
      stopCamera();
      setStep(3);
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Enroll Face: ${employeeName}`}>
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        {step === 1 && (
          <div>
            <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Camera size={40} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Capture Face Data</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Please look directly into the camera to capture facial features for secure attendance.</p>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <div style={{ width: 240, height: 240, background: '#000', margin: '0 auto 1.5rem', borderRadius: '50%', border: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {cameraError ? (
                <div style={{ color: 'var(--error)' }}><AlertCircle size={32} /></div>
              ) : (
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                />
              )}
            </div>
            {cameraError ? (
              <p style={{ color: 'var(--error)' }}>{cameraError}</p>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Hold still while we scan...</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ color: 'var(--success)', marginBottom: '1.5rem' }}>
              <CheckCircle size={80} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Enrollment Successful</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Face data has been securely saved.</p>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <Button onClick={handleNext}>
            {step === 1 ? 'Start Camera' : step === 2 ? 'Capture' : 'Finish'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
