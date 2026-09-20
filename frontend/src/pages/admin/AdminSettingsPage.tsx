import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [threshold, setThreshold] = useState(70);
  const [liveness, setLiveness] = useState(true);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('admin_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.threshold) setThreshold(parsed.threshold);
      if (parsed.liveness !== undefined) setLiveness(parsed.liveness);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('admin_settings', JSON.stringify({ threshold, liveness }));
    showToast('Settings saved successfully', 'SUCCESS');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>System Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label className="label">Recognition Threshold (Similarity Score): {threshold}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={threshold} 
              onChange={e => setThreshold(Number(e.target.value))}
              style={{ width: '100%' }} 
            />
          </div>
          <div>
            <label className="label">Liveness Detection</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="liveness" 
                checked={liveness} 
                onChange={e => setLiveness(e.target.checked)}
              />
              <label htmlFor="liveness">Enable anti-spoofing</label>
            </div>
          </div>
          <Button onClick={handleSave} style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Settings</Button>
        </div>
      </Card>
    </div>
  );
}
