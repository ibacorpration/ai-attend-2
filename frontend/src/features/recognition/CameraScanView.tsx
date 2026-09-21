import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useCameraStream } from './useCameraStream';
import { useFaceRecognition } from './useFaceRecognition';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const CameraScanView: React.FC = () => {
  const navigate = useNavigate();
  const { videoRef, startCamera, stopCamera, cameraError } = useCameraStream();
  const { scanState, setScanState, statusText, setStatusText, result, processFrame, resetState } = useFaceRecognition();
  
  const ringRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const success = await startCamera();
      if (success) {
        resetState();
      } else {
        setScanState('FAILED');
        setStatusText('Camera access denied');
      }
    };
    init();
    return () => stopCamera();
  }, [startCamera, stopCamera, resetState, setScanState, setStatusText]);

  const captureAndSend = useCallback(async () => {
    if (!videoRef.current || scanState === 'SUCCESS' || scanState === 'INIT') return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const success = await processFrame(blob);
      if (!success) {
        setTimeout(() => resetState(), 2000);
      }
    }, 'image/jpeg', 0.8);
  }, [scanState, processFrame, resetState, videoRef]);

  // Handle success navigation
  useEffect(() => {
    if (scanState === 'SUCCESS' && result) {
      stopCamera();
      const timer = setTimeout(() => {
        navigate('/employee', { state: { employee: result } });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [scanState, result, stopCamera, navigate]);

  // Attempt to scan periodically if looking
  useEffect(() => {
    let interval: any;
    if (scanState === 'LOOKING') {
      interval = setInterval(() => {
        captureAndSend();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [scanState, captureAndSend]);

  const getRingColor = () => {
    switch(scanState) {
      case 'SUCCESS': return '#10b981'; // success-main
      case 'FAILED': return '#ef4444'; // danger-main
      case 'RECOGNIZING': return '#c4f000'; // accent-primary
      default: return 'rgba(255, 255, 255, 0.4)';
    }
  };

  useGSAP(() => {
    if (ringRef.current) {
      if (scanState === 'RECOGNIZING') {
        gsap.to(ringRef.current, {
          rotate: 360,
          scale: 1.05,
          duration: 2,
          repeat: -1,
          ease: "linear",
          boxShadow: `0 0 0 4px ${getRingColor()} inset`
        });
      } else {
        gsap.killTweensOf(ringRef.current);
        gsap.to(ringRef.current, {
          rotate: 0,
          scale: 1,
          duration: 0.3,
          boxShadow: `0 0 0 4px ${getRingColor()} inset`
        });
      }
    }
  }, [scanState]);

  useGSAP(() => {
    if (statusRef.current) {
      gsap.fromTo(statusRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [statusText]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden shadow-md bg-black">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        
        {/* Scanning Ring Overlay */}
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full pointer-events-none"
        />

        {/* Camera error / Success overlay */}
        {cameraError && (
          <div className="absolute inset-0 bg-danger-main/80 flex flex-col items-center justify-center text-white p-4 text-center z-10">
            <AlertCircle size={40} className="mb-2" />
            <span>{cameraError}</span>
          </div>
        )}
        
        {scanState === 'SUCCESS' && (
          <div className="absolute inset-0 bg-success-main/20 flex items-center justify-center z-10">
            <CheckCircle2 size={80} className="text-success-main fill-white" />
          </div>
        )}
      </div>

      <div
        ref={statusRef}
        key={statusText}
        className={`px-5 py-2 rounded-full font-medium text-base shadow-sm flex items-center gap-2 ${
          scanState === 'SUCCESS' ? 'bg-success-main text-white' : 
          scanState === 'FAILED' ? 'bg-danger-main text-white' : 
          'bg-surface text-accent-primary'
        }`}
      >
        {scanState === 'FAILED' && <AlertCircle size={18} />}
        {scanState === 'SUCCESS' && <CheckCircle2 size={18} />}
        {statusText}
      </div>
    </div>
  );
};
