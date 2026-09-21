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
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { videoRef, cameraError, startCamera, stopCamera } = useCameraStream();

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setStep(1);
      setCapturedImage(null);
    }
  }, [isOpen, stopCamera]);

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
      setTimeout(() => startCamera(), 0);
    } else if (step === 2) {
      if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setCapturedImage(dataUrl);
          
          // Here you would typically send `dataUrl` to an API to persist
        }
      }
      stopCamera();
      setStep(3);
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Enroll Face: ${employeeName}`}>
      <div className="text-center py-8 px-4">
        {step === 1 && (
          <div className="flex flex-col items-center">
            <div className="bg-accent-primary/10 text-accent-primary w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Camera size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-ink">Capture Face Data</h3>
            <p className="text-ink/70 max-w-sm">Please look directly into the camera to capture facial features for secure attendance.</p>
          </div>
        )}
        
        {step === 2 && (
          <div className="flex flex-col items-center">
            <div className="w-[240px] h-[240px] bg-black mb-6 rounded-full border-4 border-accent-primary flex items-center justify-center overflow-hidden">
              {cameraError ? (
                <div className="text-danger-main"><AlertCircle size={32} /></div>
              ) : (
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              )}
            </div>
            {cameraError ? (
              <p className="text-danger-main font-medium">{cameraError}</p>
            ) : (
              <p className="text-ink/70 font-medium animate-pulse">Hold still while we scan...</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              {capturedImage ? (
                <img src={capturedImage} alt="Captured face" className="w-[120px] h-[120px] rounded-full object-cover border-4 border-success-main shadow-lg scale-x-[-1]" />
              ) : (
                <div className="text-success-main mb-6">
                  <CheckCircle size={80} className="mx-auto" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-success-main text-white rounded-full p-1 border-4 border-surface">
                <CheckCircle size={24} />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-ink">Enrollment Successful</h3>
            <p className="text-ink/70">Face data has been securely saved.</p>
          </div>
        )}

        <div className="mt-8">
          <Button 
            onClick={handleNext} 
            className="w-full py-4 text-lg"
            color={step === 3 ? "success" : "primary"}
          >
            {step === 1 ? 'Start Camera' : step === 2 ? 'Capture Photo' : 'Finish & Close'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
