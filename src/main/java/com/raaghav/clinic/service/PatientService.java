package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.PatientMapper;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public PatientResponseDTO getPatientById(Long id){
        Patient patient=patientRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Patient not found with given id"));
        return PatientMapper.toResponse(patient);
    }
    public List<PatientResponseDTO> getAllPatients(){
        return patientRepository.findAll().stream().map(PatientMapper::toResponse).toList();
    }
    public PatientResponseDTO updatePatient(Long id,PatientRequestDTO request){
        Patient patient=patientRepository.findById(id).orElseThrow(() ->new ResourceNotFoundException("Patient with the id is not found"));
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());
        patientRepository.save(patient);
        return PatientMapper.toResponse(patient);
    }
    public void deletePatient(Long id){
        Patient patient=patientRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Patient with the id is not found"));
        patientRepository.delete(patient);
    }
    public List<PatientResponseDTO> getPatientsByName(String searchString){
        return patientRepository.findByNameContainingIgnoreCase(searchString).stream().map(PatientMapper::toResponse).toList();
    }
}
