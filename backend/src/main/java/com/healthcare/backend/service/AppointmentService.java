package com.healthcare.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.backend.model.Appointment;
import com.healthcare.backend.repository.AppointmentRepository;

@Service
public class AppointmentService {
    @Autowired private AppointmentRepository appointmentRepository;
    public List<Appointment> getAppointmentsByPatientId(Long id) {
        return appointmentRepository.findByPatientId(id);
    }
    public List<Appointment> getAppointmentsByDoctorId(Long id) {
        return appointmentRepository.findByDoctorId(id);
    }
    public Appointment saveAppointment(Appointment a) { return appointmentRepository.save(a); }
}