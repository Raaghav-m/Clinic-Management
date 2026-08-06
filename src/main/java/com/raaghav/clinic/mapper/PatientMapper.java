package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.entity.Role;
import com.raaghav.clinic.entity.User;

public class PatientMapper {
    public static Patient toEntity(PatientRequestDTO request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setRole(Role.PATIENT);

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        return patient;
    }

    public static void updateEntity(Patient patient, PatientRequestDTO request) {
        User user = patient.getUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(request.getPassword());
        }
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
    }

    public static PatientResponseDTO toResponse(Patient savedPatient) {
        User user = savedPatient.getUser();
        PatientResponseDTO response = new PatientResponseDTO();
        response.setId(savedPatient.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setAge(savedPatient.getAge());
        response.setGender(savedPatient.getGender());
        response.setPhone(user.getPhone());
        return response;
    }
}
