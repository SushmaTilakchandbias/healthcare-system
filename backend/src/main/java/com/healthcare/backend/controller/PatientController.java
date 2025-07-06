package com.healthcare.backend.controller;

import com.healthcare.backend.model.Appointment;
import com.healthcare.backend.model.MedicalRecord;
import com.healthcare.backend.model.Patient;
import com.healthcare.backend.model.Prescription;
import com.healthcare.backend.service.AppointmentService;
import com.healthcare.backend.service.MedicalRecordService;
import com.healthcare.backend.service.PatientService;
import com.healthcare.backend.service.PrescriptionService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
@CrossOrigin("http://localhost:3000")
public class PatientController {
    @Autowired private PatientService patientService;
    @Autowired private AppointmentService appointmentService;
    @Autowired private PrescriptionService prescriptionService;
    @Autowired private MedicalRecordService medicalRecordService;

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<?> getPatientDashboard(@PathVariable Long id) {
        Optional<Patient> patientOpt = patientService.getPatientById(id);
        if (patientOpt.isEmpty()) return ResponseEntity.notFound().build();

        Patient patient = patientOpt.get();

        Map<String, Object> response = new HashMap<>();
        response.put("patient", patient);
        response.put("appointments", appointmentService.getAppointmentsByPatientId(id));
        response.put("prescriptions", prescriptionService.getByPatientId(id));
        response.put("records", medicalRecordService.getByPatient(id));

        return ResponseEntity.ok(response);
    }

    }


