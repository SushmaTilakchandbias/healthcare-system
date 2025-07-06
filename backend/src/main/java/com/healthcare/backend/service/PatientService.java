package com.healthcare.backend.service;

import com.healthcare.backend.model.Patient;

public interface PatientService {
    Patient getPatientByUsername(String username);
}
