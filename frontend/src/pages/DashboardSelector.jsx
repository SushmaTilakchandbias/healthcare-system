import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../services/jwt';

const DashboardSelector = () => {
  const role = getUserRoleFromToken();

  if (role === 'ADMIN') return <Navigate to="/admin/dashboard" />;
  if (role === 'DOCTOR') return <Navigate to="/doctor/dashboard" />;
  if (role === 'PATIENT') return <Navigate to="/patient/dashboard" />;

  return <Navigate to="/login" />;
};

export default DashboardSelector;
