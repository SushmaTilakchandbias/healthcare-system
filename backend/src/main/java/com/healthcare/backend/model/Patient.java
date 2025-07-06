package com.healthcare.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Patient {
    @Id
    private Long id; // Same as User ID

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String emergencyContactName;
    private String emergencyContactNumber;
    @Column(columnDefinition = "TEXT")
    private String medicalHistorySummary;
    @Column(columnDefinition = "TEXT")
    private String allergies;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getEmergencyContactName() {
		return emergencyContactName;
	}
	public void setEmergencyContactName(String emergencyContactName) {
		this.emergencyContactName = emergencyContactName;
	}
	public String getEmergencyContactNumber() {
		return emergencyContactNumber;
	}
	public void setEmergencyContactNumber(String emergencyContactNumber) {
		this.emergencyContactNumber = emergencyContactNumber;
	}
	public String getMedicalHistorySummary() {
		return medicalHistorySummary;
	}
	public void setMedicalHistorySummary(String medicalHistorySummary) {
		this.medicalHistorySummary = medicalHistorySummary;
	}
	public String getAllergies() {
		return allergies;
	}
	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

}
