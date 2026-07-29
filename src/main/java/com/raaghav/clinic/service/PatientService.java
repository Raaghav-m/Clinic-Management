package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.mapper.PatientMapper;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    public PatientService(PatientRepository patientRepository1){
        this.patientRepository=patientRepository1;
        System.out.println("hello there");
    }
    public PatientResponseDTO savePatient(PatientRequestDTO request){
        Patient patient= PatientMapper.toEntity(request);
        Patient savedPatient= patientRepository.save(patient);
        return PatientMapper.toResponse(savedPatient);

    }
}
