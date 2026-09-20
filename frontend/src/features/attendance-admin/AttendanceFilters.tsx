import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const AttendanceFilters: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <Input placeholder="Search employee..." icon={<Search size={18} />} />
      </div>
      <div>
        <label className="label">Date Range</label>
        <input type="date" className="input-field" />
      </div>
      <Button variant="secondary" icon={<Filter size={18} />}>More Filters</Button>
    </div>
  );
};
