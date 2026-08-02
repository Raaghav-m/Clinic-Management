package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.entity.Doctor;

public class DoctorMapper {
    public static Doctor toEntity(DoctorRequestDTO doctorRequestDTO){
        Doctor doctor=new Doctor();
        doctor.setConsultationFee(doctorRequestDTO.getConsultationFee());
        doctor.setEndTime(doctorRequestDTO.getEndTime());
        doctor.setExperience(doctorRequestDTO.getExperience());
        doctor.setName(doctorRequestDTO.getName());
        doctor.setPhone(doctorRequestDTO.getPhone());
        doctor.setSpecialization(doctorRequestDTO.getSpecialization());
        doctor.setStartTime(doctorRequestDTO.getStartTime());
        return doctor;
    }
    public static DoctorResponseDTO toResponse(Doctor doctor){
        DoctorResponseDTO doctorResponseDTO=new DoctorResponseDTO();
        doctorResponseDTO.setConsultationFee(doctor.getConsultationFee());
        doctorResponseDTO.setEndTime(doctor.getEndTime());
        doctorResponseDTO.setExperience(doctor.getExperience());
        doctorResponseDTO.setId(doctor.getId());
        doctorResponseDTO.setName(doctor.getName());
        doctorResponseDTO.setPhone(doctor.getPhone());
        doctorResponseDTO.setSpecialization(doctor.getSpecialization());
        doctorResponseDTO.setStartTime(doctor.getStartTime());
        return doctorResponseDTO;
    }
}
