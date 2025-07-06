package com.healthcare.backend.controller;

import com.healthcare.backend.model.Doctor;
import com.healthcare.backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/profile")
    public ResponseEntity<?> getDoctorProfile(Authentication auth) {
        String username = auth.getName();
        return doctorService.getDoctorByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
