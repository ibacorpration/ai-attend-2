import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const DashboardChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const data = [
    { day: 'Mon', present: 45, absent: 5 },
    { day: 'Tue', present: 48, absent: 2 },
    { day: 'Wed', present: 42, absent: 8 },
    { day: 'Thu', present: 49, absent: 1 },
    { day: 'Fri', present: 46, absent: 4 },
  ];

  const maxTotal = 50;

  useGSAP(() => {
    if (containerRef.current) {
      const bars = gsap.utils.toArray('.chart-bar', containerRef.current);
      gsap.fromTo(bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  return (
    <Card className="h-[350px] flex flex-col">
      <h3 className="mb-6 text-ink/70 font-semibold text-sm">Attendance Trends (This Week)</h3>
      <div ref={containerRef} className="flex-1 flex items-end justify-around gap-4 pt-8">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full h-[200px] flex flex-col justify-end gap-0.5">
              <div 
                className="w-full bg-danger-main chart-bar"
                style={{ 
                  height: `${(item.absent / maxTotal) * 100}%`,
                  borderRadius: '4px 4px 0 0',
                }} 
                title={`${item.absent} Absent`}
              />
              <div 
                className="w-full bg-success-main chart-bar"
                style={{ 
                  height: `${(item.present / maxTotal) * 100}%`,
                  borderRadius: item.absent === 0 ? '4px 4px 0 0' : '0',
                }} 
                title={`${item.present} Present`}
              />
            </div>
            <span className="text-sm text-ink/60 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-8 mt-6 text-sm text-ink/60 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-success-main" /> Present
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-danger-main" /> Absent
        </div>
      </div>
    </Card>
  );
};
