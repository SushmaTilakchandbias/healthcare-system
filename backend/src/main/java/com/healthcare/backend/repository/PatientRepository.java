package com.healthcare.backend.repository;

import com.healthcare.backend.model.Patient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
	Optional<Patient> findByUserUsername(String username);
}