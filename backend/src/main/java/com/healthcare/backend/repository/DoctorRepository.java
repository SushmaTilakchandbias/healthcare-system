package com.healthcare.backend.repository;

import com.healthcare.backend.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DoctorRepository extends JpaRepository<Doctor, Long> {}
