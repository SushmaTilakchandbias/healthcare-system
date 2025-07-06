import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { getUserIdFromToken } from '../services/jwt';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = getUserIdFromToken();
        const res = await API.get(`/patient/${userId}/dashboard`);
        setDashboardData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard.');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!dashboardData) return <p>No dashboard data found.</p>;

  const { patient, appointments, prescriptions, records } = dashboardData;

  return (
    <div>
      <h2>Welcome, {patient?.user?.firstName || 'Patient'}!</h2>
      <h3>Patient Details</h3>
      <ul>
        <li><strong>DOB:</strong> {patient.dateOfBirth}</li>
        <li><strong>Gender:</strong> {patient.gender}</li>
        <li><strong>Blood Group:</strong> {patient.bloodGroup}</li>
        <li><strong>Emergency Contact:</strong> {patient.emergencyContactName} ({patient.emergencyContactNumber})</li>
        <li><strong>Medical History:</strong> {patient.medicalHistorySummary}</li>
        <li><strong>Allergies:</strong> {patient.allergies}</li>
      </ul>

      <h3>Appointments</h3>
      <ul>
        {appointments.map(appt => (
          <li key={appt.appointmentId}>
            {appt.appointmentDate} at {appt.appointmentTime} with Doctor ID: {appt.doctor.id} ({appt.status})
          </li>
        ))}
      </ul>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(pres => (
          <li key={pres.prescriptionId}>
            {pres.prescriptionDate}: {pres.medicationName} ({pres.dosage})
          </li>
        ))}
      </ul>

      <h3>Medical Records</h3>
      <ul>
        {records.map(rec => (
          <li key={rec.recordId}>
            [{rec.recordType}] {rec.title}: {rec.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
