import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { getUserIdFromToken } from '../services/jwt';


import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './PatientDashboard.css'; 



const PatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // <-- useNavigate must be inside the component

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const userId = getUserIdFromToken();
      console.log('🧪 Extracted userId from token:', userId);

      if (!userId) {
        setError('Invalid or missing user ID');
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`/patient/${userId}/dashboard`);
        console.log('✅ Dashboard data:', res.data);
        setDashboardData(res.data);
      } catch (err) {
        console.error('❌ Dashboard fetch error:', err.response || err.message);
        setError('Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!dashboardData) return <p>No data available.</p>;

  const { patient, appointments, prescriptions, records } = dashboardData;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {patient?.user?.firstName || patient?.user?.username || 'Patient'}!</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>

      <section>
        <h3>Patient Details</h3>
        <ul>
          <li><strong>DOB:</strong> {patient.dateOfBirth}</li>
          <li><strong>Gender:</strong> {patient.gender}</li>
          <li><strong>Blood Group:</strong> {patient.bloodGroup}</li>
          <li><strong>Emergency Contact:</strong> {patient.emergencyContactName} ({patient.emergencyContactNumber})</li>
          <li><strong>Medical History:</strong> {patient.medicalHistorySummary}</li>
          <li><strong>Allergies:</strong> {patient.allergies}</li>
        </ul>
      </section>

      <section>
        <h3>Appointments</h3>
        {appointments?.length > 0 ? (
          <ul>
            {appointments.map((appt) => (
              <li key={appt.appointmentId}>
                {appt.appointmentDate} at {appt.appointmentTime} with Doctor ID: {appt.doctor?.id || 'N/A'} ({appt.status})
              </li>
            ))}
          </ul>
        ) : <p>No appointments found.</p>}
      </section>

      <section>
        <h3>Prescriptions</h3>
        {prescriptions?.length > 0 ? (
          <ul>
            {prescriptions.map((pres) => (
              <li key={pres.prescriptionId}>
                {pres.prescriptionDate}: {pres.medicationName} ({pres.dosage})
              </li>
            ))}
          </ul>
        ) : <p>No prescriptions found.</p>}
      </section>

      <section>
        <h3>Medical Records</h3>
        {records?.length > 0 ? (
          <ul>
            {records.map((rec) => (
              <li key={rec.recordId}>
                [{rec.recordType}] {rec.title}: {rec.description}
              </li>
            ))}
          </ul>
        ) : <p>No medical records found.</p>}
      </section>
    </div>
  );
};

export default PatientDashboard;
