package com.healthcare.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.model.Patient;
import com.healthcare.backend.repository.PatientRepository;

public interface PatientService {
    Patient getPatientByUsername(String username);
    Optional<Patient> getPatientById(Long id); 
}