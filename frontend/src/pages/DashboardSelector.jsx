import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../services/jwt';

const DashboardSelector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role === 'ADMIN') navigate('/admin/dashboard');
    else if (role === 'DOCTOR') navigate('/doctor/dashboard');
    else if (role === 'PATIENT') navigate('/patient/dashboard');
    else navigate('/login');
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default DashboardSelector;
