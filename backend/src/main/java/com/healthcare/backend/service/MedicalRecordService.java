package com.healthcare.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.model.MedicalRecord;
import com.healthcare.backend.repository.MedicalRecordRepository;

@Service
public class MedicalRecordService {
    @Autowired private MedicalRecordRepository repo;
    public List<MedicalRecord> getByPatient(Long id) { return repo.findByPatientId(id); }
    public MedicalRecord save(MedicalRecord r) { return repo.save(r); }
}