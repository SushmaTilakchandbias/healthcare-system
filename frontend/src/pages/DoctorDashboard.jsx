import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/doctor/${userId}/dashboard`)
      .then(res => {
        setAppointments(res.data.appointments);
        setPrescriptions(res.data.prescriptions);
      })
      .catch(err => console.error("Error fetching doctor dashboard", err));
  }, [userId]);

  return (
    <div>
      <h2>Doctor Dashboard</h2>

      <h3>Appointments</h3>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>
            Patient #{appt.patient.id} - {appt.appointmentDate} - {appt.status}
          </li>
        ))}
      </ul>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map((p, index) => (
          <li key={index}>
            {p.medicationName} - {p.dosage} ({p.prescriptionDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
