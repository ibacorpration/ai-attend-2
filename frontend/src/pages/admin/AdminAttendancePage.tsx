import React, { useState, useEffect } from 'react';
import { AttendanceFilters } from '@/features/attendance-admin/AttendanceFilters';
import { AttendanceTable } from '@/features/attendance-admin/AttendanceTable';
import { attendanceService } from '@/services/attendanceService';

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await attendanceService.getDailyAttendance();
        setRecords(data.map(d => ({
          id: d.id,
          employeeName: `EMP ${d.employee_id}`, // Mock name for now unless joined
          date: d.date,
          checkIn: d.check_in ? new Date(d.check_in).toLocaleTimeString() : '',
          checkOut: d.check_out ? new Date(d.check_out).toLocaleTimeString() : '',
          status: d.status
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <AttendanceFilters />
      {loading ? <p>Loading attendance...</p> : <AttendanceTable records={records} />}
    </div>
  );
}
