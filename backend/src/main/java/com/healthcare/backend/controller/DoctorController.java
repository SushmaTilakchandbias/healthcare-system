package com.healthcare.backend.controller;

import com.healthcare.backend.model.Appointment;
import com.healthcare.backend.model.Doctor;
import com.healthcare.backend.model.Prescription;
import com.healthcare.backend.service.AppointmentService;
import com.healthcare.backend.service.DoctorService;
import com.healthcare.backend.service.PrescriptionService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
@CrossOrigin("http://localhost:3000")
public class DoctorController {
    @Autowired private DoctorService doctorService;
    @Autowired private AppointmentService appointmentService;
    @Autowired private PrescriptionService prescriptionService;

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<?> getDoctorDashboard(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorService.getDoctorById(id);
        if (doctor.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(
            new Object() {
                public List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(id);
                public List<Prescription> prescriptions = prescriptionService.getByDoctorId(id);
            }
        );
    }
    @PostMapping("/prescriptions")
    public ResponseEntity<?> createPrescription(@RequestBody Prescription p) {
        return ResponseEntity.ok(prescriptionService.save(p));
    }
}
