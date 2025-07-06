package com.healthcare.backend.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.backend.model.AuthRequest;
import com.healthcare.backend.model.AuthResponse;
import com.healthcare.backend.model.SignupRequest;
import com.healthcare.backend.model.User;
import com.healthcare.backend.repository.UserRepository;
import com.healthcare.backend.security.JwtUtil;
import com.healthcare.backend.service.UserDetailsServiceImpl;
import com.healthcare.backend.repository.PatientRepository;
import com.healthcare.backend.model.Patient;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired 
	private PasswordEncoder passwordEncoder;
	@Autowired 
	private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Create and save the User
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole().toUpperCase());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        User savedUser = userRepository.save(user);

        // Create and save Patient details if role is PATIENT
        if ("PATIENT".equalsIgnoreCase(savedUser.getRole())) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setDateOfBirth(LocalDate.parse(request.getDateOfBirth())); // Format: yyyy-MM-dd
            patient.setGender(request.getGender());
            patient.setBloodGroup(request.getBloodGroup());
            patient.setEmergencyContactName(request.getEmergencyContactName());
            patient.setEmergencyContactNumber(request.getEmergencyContactNumber());
            patient.setMedicalHistorySummary(request.getMedicalHistorySummary());
            patient.setAllergies(request.getAllergies());

            patientRepository.save(patient);
        }

        return ResponseEntity.ok("User registered successfully");
    }


}
