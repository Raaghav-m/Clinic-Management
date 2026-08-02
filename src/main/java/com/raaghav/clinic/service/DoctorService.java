package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.mapper.DoctorMapper;
import com.raaghav.clinic.repository.DoctorRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    public DoctorService(DoctorRepository doctorRepository){
        this.doctorRepository=doctorRepository;
    }
    public DoctorResponseDTO addDoctor(DoctorRequestDTO doctorRequestDTO){
        Doctor newDoctor= DoctorMapper.toEntity(doctorRequestDTO);
        Doctor savedDoctor=doctorRepository.save(newDoctor);
        return DoctorMapper.toResponse(savedDoctor);
    }
}
