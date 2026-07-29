package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Patient;

public class PatientMapper {
    public static Patient toEntity(PatientRequestDTO request){
        Patient patient=new Patient();
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());
        return patient;
    }
    public static PatientResponseDTO toResponse(Patient savedPatient){
        PatientResponseDTO response=new PatientResponseDTO();
        response.setId(savedPatient.getId());
        response.setName(savedPatient.getName());
        response.setAge(savedPatient.getAge());
        response.setGender(savedPatient.getGender());
        response.setPhone(savedPatient.getPhone());

        return response;
    }
}
