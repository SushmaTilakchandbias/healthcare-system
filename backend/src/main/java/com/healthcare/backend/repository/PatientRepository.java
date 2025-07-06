package com.healthcare.backend.repository;

import com.healthcare.backend.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByUserUsername(String username);
}
