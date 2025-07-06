package com.healthcare.backend.service;

import com.healthcare.backend.model.Patient;
import com.healthcare.backend.repository.PatientRepository;
import com.healthcare.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient getPatientByUsername(String username) {
        return patientRepository.findByUserUsername(username);
    }
}
