import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useCameraStream } from './useCameraStream';
import { useFaceRecognition } from './useFaceRecognition';

export const CameraScanView: React.FC = () => {
  const navigate = useNavigate();
  const { videoRef, startCamera, stopCamera, cameraError } = useCameraStream();
  const { scanState, setScanState, statusText, setStatusText, result, processFrame, resetState } = useFaceRecognition();

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
      case 'SUCCESS': return 'var(--success)';
      case 'FAILED': return 'var(--error)';
      case 'RECOGNIZING': return 'var(--accent-primary)';
      default: return 'rgba(255, 255, 255, 0.4)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ 
        position: 'relative', 
        width: '280px', height: '280px',
        borderRadius: '50%', overflow: 'hidden',
        boxShadow: 'var(--shadow-md)', background: '#000'
      }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
        
        {/* Scanning Ring Overlay (Inline for simplicity) */}
        <motion.div
          animate={{
            boxShadow: `0 0 0 4px ${getRingColor()} inset`,
            scale: scanState === 'RECOGNIZING' ? [1, 1.05, 1] : 1,
            rotate: scanState === 'RECOGNIZING' ? 360 : 0
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', pointerEvents: 'none' }}
        />

        {/* Success animation */}
        <AnimatePresence>
          {scanState === 'SUCCESS' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={80} color="var(--success)" fill="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={statusText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            background: scanState === 'SUCCESS' ? 'var(--success)' : scanState === 'FAILED' ? 'var(--error)' : 'var(--surface-color)',
            color: (scanState === 'SUCCESS' || scanState === 'FAILED') ? 'white' : 'var(--accent-primary)',
            padding: '0.5rem 1.25rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem',
            boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          {scanState === 'FAILED' && <AlertCircle size={18} />}
          {scanState === 'SUCCESS' && <CheckCircle2 size={18} />}
          {statusText}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
