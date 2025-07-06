package com.healthcare.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    private Long doctorId; // Matches user_id in Users

    @OneToOne
    @MapsId
    @JoinColumn(name = "doctor_id")
    private User user;

    private String specialty;
    private String licenseNumber;
    private String clinicAddress;
    private Double consultationFee;
	public Long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getSpecialty() {
		return specialty;
	}
	public void setSpecialty(String specialty) {
		this.specialty = specialty;
	}
	public String getLicenseNumber() {
		return licenseNumber;
	}
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	public String getClinicAddress() {
		return clinicAddress;
	}
	public void setClinicAddress(String clinicAddress) {
		this.clinicAddress = clinicAddress;
	}
	public Double getConsultationFee() {
		return consultationFee;
	}
	public void setConsultationFee(Double consultationFee) {
		this.consultationFee = consultationFee;
	}
    

    // Getters and Setters
}
