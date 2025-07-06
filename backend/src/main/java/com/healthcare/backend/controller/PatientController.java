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
import java.util.List;
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
        System.out.println("Received dashboard request for patient ID: " + id); // ✅ DEBUG LOG
        Optional<Patient> patient = patientService.getPatientById(id);
        if (patient.isEmpty()) {
            System.out.println("❌ Patient not found");
            return ResponseEntity.notFound().build();
        }

        try {
            return ResponseEntity.ok(
                new HashMap<String, Object>() {{
                    put("patient", patient.get());
                    put("appointments", appointmentService.getAppointmentsByPatientId(id));
                    put("prescriptions", prescriptionService.getByPatientId(id));
                    put("records", medicalRecordService.getByPatient(id));
                }}
            );
        } catch (Exception e) {
            System.out.println("❌ Error fetching dashboard data: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Dashboard load failed");
        }
    }
}
