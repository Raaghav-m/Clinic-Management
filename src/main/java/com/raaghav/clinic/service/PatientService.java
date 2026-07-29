package com.raaghav.clinic.service;

import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    public PatientService(PatientRepository patientRepository1){
        this.patientRepository=patientRepository1;
        System.out.println("hello there");
    }
    public Patient savePatient(Patient patient){
        return patientRepository.save(patient);
    }
}
