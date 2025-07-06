import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDashboard = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/patient/${userId}/dashboard`)
      .then(res => {
        setAppointments(res.data.appointments);
        setPrescriptions(res.data.prescriptions);
        setRecords(res.data.records);
      })
      .catch(err => console.error("Error fetching dashboard", err));
  }, [userId]);

  return (
    <div>
      <h2>Patient Dashboard</h2>

      <h3>Appointments</h3>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>
            {appt.appointmentDate} - {appt.status}
          </li>
        ))}
      </ul>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map((p, index) => (
          <li key={index}>{p.medicationName} - {p.dosage}</li>
        ))}
      </ul>

      <h3>Medical Records</h3>
      <ul>
        {records.map((r, index) => (
          <li key={index}>{r.recordType} - {r.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
