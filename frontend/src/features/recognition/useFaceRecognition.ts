import { useState, useCallback } from 'react';
import { recognitionService } from '@/services/recognitionService';
import { RecognitionResult } from '@/types/recognition';

export type ScanState = 
  | 'INIT' 
  | 'LOOKING' 
  | 'DETECTED' 
  | 'VERIFYING' 
  | 'RECOGNIZING' 
  | 'SUCCESS' 
  | 'FAILED';

export function useFaceRecognition() {
  const [scanState, setScanState] = useState<ScanState>('INIT');
  const [statusText, setStatusText] = useState('Initializing camera...');
  const [result, setResult] = useState<RecognitionResult | null>(null);

  const processFrame = useCallback(async (blob: Blob) => {
    setScanState('RECOGNIZING');
    setStatusText('AI Analyzing...');
    
    try {
      const formData = new FormData();
      formData.append('file', blob, 'frame.jpg');
      
      const res = await recognitionService.verify(formData);
      
      if (res.success) {
        setScanState('SUCCESS');
        setStatusText('Identity confirmed ✅');
        setResult(res);
        return true;
      } else {
        setScanState('FAILED');
        setStatusText(res.error || 'Face not recognized — try again');
        return false;
      }
    } catch (err: any) {
      setScanState('FAILED');
      setStatusText(err.response?.data?.detail || 'Network error');
      return false;
    }
  }, []);

  const resetState = useCallback(() => {
    setScanState('LOOKING');
    setStatusText('Looking for a face...');
    setResult(null);
  }, []);

  return {
    scanState,
    setScanState,
    statusText,
    setStatusText,
    result,
    processFrame,
    resetState
  };
}
