package com.healthcare.backend.controller;

import com.healthcare.backend.model.Appointment;
import com.healthcare.backend.model.MedicalRecord;
import com.healthcare.backend.model.Patient;
import com.healthcare.backend.model.Prescription;
import com.healthcare.backend.service.AppointmentService;
import com.healthcare.backend.service.MedicalRecordService;
import com.healthcare.backend.service.PatientService;
import com.healthcare.backend.service.PrescriptionService;

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
    	Optional<Patient> patient = patientService.getPatientById(id);
    	if (patient.isEmpty()) return ResponseEntity.notFound().build();
    	//Patient p = patient.get();
        return ResponseEntity.ok(
            new Object() {
                public List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(id);
                public List<Prescription> prescriptions = prescriptionService.getByPatientId(id);
                public List<MedicalRecord> records = medicalRecordService.getByPatient(id);
            }
        );
    }
}

