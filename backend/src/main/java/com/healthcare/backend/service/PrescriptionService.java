package com.healthcare.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.model.Prescription;
import com.healthcare.backend.repository.PrescriptionRepository;

@Service
public class PrescriptionService {
    @Autowired private PrescriptionRepository prescriptionRepository;
    public List<Prescription> getByPatientId(Long id) {
        return prescriptionRepository.findByPatientId(id);
    }
    public List<Prescription> getByDoctorId(Long id) {
        return prescriptionRepository.findByDoctorId(id);
    }
    public Prescription save(Prescription p) { return prescriptionRepository.save(p); }
}