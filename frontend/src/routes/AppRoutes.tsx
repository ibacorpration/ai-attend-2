import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/admin/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

import LandingPage from '@/pages/LandingPage';
import EmployeeScanPage from '@/pages/EmployeeScanPage';
import EmployeeProfilePage from '@/pages/EmployeeProfilePage';
import AdminLoginPage from '@/pages/AdminLoginPage';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminEmployeesPage from '@/pages/admin/AdminEmployeesPage';
import AdminEmployeeDetailPage from '@/pages/admin/AdminEmployeeDetailPage';
import AdminMessagesPage from '@/pages/admin/AdminMessagesPage';
import AdminAttendancePage from '@/pages/admin/AdminAttendancePage';
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<EmployeeScanPage />} />
        <Route path="/employee" element={<EmployeeProfilePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/employees" element={<AdminEmployeesPage />} />
          <Route path="/admin/employees/:id" element={<AdminEmployeeDetailPage />} />
          <Route path="/admin/attendance" element={<AdminAttendancePage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
