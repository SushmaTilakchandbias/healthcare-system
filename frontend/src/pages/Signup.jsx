import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.css'; // Shared styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    medicalHistorySummary: '',
    allergies: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      await axios.post('http://localhost:8080/auth/signup', payload);
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Signup failed. Username may already exist.');
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Re-enter Password" value={formData.confirmPassword} onChange={handleChange} required />
        
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>

        {/* Additional Fields only for PATIENT */}
        {formData.role === 'PATIENT' && (
          <>
            <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required placeholder="Date of Birth" />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="bloodGroup" placeholder="Blood Group (e.g., O+)" value={formData.bloodGroup} onChange={handleChange} required />
            <input name="emergencyContactName" placeholder="Emergency Contact Name" value={formData.emergencyContactName} onChange={handleChange} required />
            <input name="emergencyContactNumber" placeholder="Emergency Contact Number" value={formData.emergencyContactNumber} onChange={handleChange} required />
            <textarea name="medicalHistorySummary" placeholder="Medical History Summary" value={formData.medicalHistorySummary} onChange={handleChange} required />
            <textarea name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} required />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
