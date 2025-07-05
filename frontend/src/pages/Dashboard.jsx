import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../services/jwt';


const Dashboard = () => {
  const navigate = useNavigate();
  const role = getUserRoleFromToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Dashboard</h2>
      <p>You are logged in as: <strong>{role}</strong></p>
      <button onClick={handleLogout}>Logout</button>

      {role === 'ADMIN' && (
        <div style={{ marginTop: '20px' }}>
          <h3>Admin Panel</h3>
          <p>Access to admin-only resources.</p>
        </div>
      )}

      {role === 'PATIENT' && (
        <div style={{ marginTop: '20px' }}>
          <h3>Patient Portal</h3>
          <p>Book appointments and view prescriptions.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;