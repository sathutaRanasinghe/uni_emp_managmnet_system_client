import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import HRDashboard from './dashboards/HRDashboard';
import LecturerDashboard from './dashboards/LecturerDashboard';
import StudentDashboard from './dashboards/StudentDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'lecturer':
        return <LecturerDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <div>Access denied</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;