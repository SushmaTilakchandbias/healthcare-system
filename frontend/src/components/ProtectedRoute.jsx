import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../services/jwt';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = getUserRoleFromToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
