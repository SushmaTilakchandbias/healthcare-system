package com.healthcare.backend.service;

import com.healthcare.backend.model.Doctor;
import com.healthcare.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {
    @Autowired private DoctorRepository doctorRepository;
    public Optional<Doctor> getDoctorById(Long id) { return doctorRepository.findById(id); }
}