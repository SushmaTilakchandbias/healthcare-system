package com.healthcare.backend.controller;

import com.healthcare.backend.model.Patient;
import com.healthcare.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/profile")
    public Patient getProfile(@RequestParam String username) {
        return patientService.getPatientByUsername(username);
    }
}
