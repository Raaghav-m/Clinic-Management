package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.DoctorMapper;
import com.raaghav.clinic.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<DoctorResponseDTO> getAllDoctors(){
        return doctorRepository.findAll().stream().map(DoctorMapper::toResponse).toList();
    }
    public DoctorResponseDTO getDoctorById(Long id){
        Doctor doctor= doctorRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("The doctor is not found with the given id"));
        return DoctorMapper.toResponse(doctor);
    }

    public DoctorResponseDTO updateDoctor(Long id, DoctorRequestDTO doctorRequestDTO){
        Doctor doctor=doctorRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("the doctor is not found with the given id"));
        doctor.setStartTime(doctorRequestDTO.getStartTime());
        doctor.setSpecialization(doctorRequestDTO.getSpecialization());
        doctor.setPhone(doctorRequestDTO.getPhone());
        doctor.setName(doctorRequestDTO.getName());
        doctor.setExperience(doctorRequestDTO.getExperience());
        doctor.setEndTime(doctorRequestDTO.getEndTime());
        doctor.setConsultationFee(doctorRequestDTO.getConsultationFee());
        doctorRepository.save(doctor);
        return DoctorMapper.toResponse(doctor);
    }
    public void deleteDoctor(Long id){
        Doctor doctor=doctorRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("the doctor is not found with the given id"));
        doctorRepository.delete(doctor);
    }
}
