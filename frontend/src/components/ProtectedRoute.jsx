import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken ,isTokenExpired} from '../services/jwt';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
 

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token'); // Clear expired token
    alert('🔒 Session expired. Please login again.');
   return <Navigate to="/login" state={{ sessionExpired: true }} replace />;

  }

  const userRole = getUserRoleFromToken();

  // If role is required and doesn't match, redirect to general dashboard
  if (role && userRole !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
