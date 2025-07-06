import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../services/jwt';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = getUserRoleFromToken();

  // 🚫 If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ⚠️ If the route is restricted by role and user doesn't match, redirect
  if (role && userRole !== role) {
    // You can customize this redirect
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
