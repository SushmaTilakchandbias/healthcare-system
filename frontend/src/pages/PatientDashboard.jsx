import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome, Patient</h2>
      <div className="dashboard-grid">
        <button onClick={() => navigate('/prescriptions')}>View Prescriptions</button>
        <button onClick={() => navigate('/appointments')}>Appointments</button>
        <button onClick={() => navigate('/medical-records')}>Medical Records</button>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
};

export default PatientDashboard;
