package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.entity.Role;
import com.raaghav.clinic.entity.User;

public class DoctorMapper {
    public static Doctor toEntity(DoctorRequestDTO doctorRequestDTO) {
        User user = new User();
        user.setName(doctorRequestDTO.getName());
        user.setEmail(doctorRequestDTO.getEmail());
        user.setPhone(doctorRequestDTO.getPhone());
        user.setRole(Role.DOCTOR);

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setConsultationFee(doctorRequestDTO.getConsultationFee());
        doctor.setEndTime(doctorRequestDTO.getEndTime());
        doctor.setExperience(doctorRequestDTO.getExperience());
        doctor.setSpecialization(doctorRequestDTO.getSpecialization());
        doctor.setStartTime(doctorRequestDTO.getStartTime());
        return doctor;
    }

    public static void updateEntity(Doctor doctor, DoctorRequestDTO doctorRequestDTO) {
        User user = doctor.getUser();
        user.setName(doctorRequestDTO.getName());
        user.setEmail(doctorRequestDTO.getEmail());
        user.setPhone(doctorRequestDTO.getPhone());
        doctor.setStartTime(doctorRequestDTO.getStartTime());
        doctor.setSpecialization(doctorRequestDTO.getSpecialization());
        doctor.setExperience(doctorRequestDTO.getExperience());
        doctor.setEndTime(doctorRequestDTO.getEndTime());
        doctor.setConsultationFee(doctorRequestDTO.getConsultationFee());
    }

    public static DoctorResponseDTO toResponse(Doctor doctor) {
        User user = doctor.getUser();
        DoctorResponseDTO doctorResponseDTO = new DoctorResponseDTO();
        doctorResponseDTO.setConsultationFee(doctor.getConsultationFee());
        doctorResponseDTO.setEndTime(doctor.getEndTime());
        doctorResponseDTO.setExperience(doctor.getExperience());
        doctorResponseDTO.setId(doctor.getId());
        doctorResponseDTO.setName(user.getName());
        doctorResponseDTO.setEmail(user.getEmail());
        doctorResponseDTO.setPhone(user.getPhone());
        doctorResponseDTO.setSpecialization(doctor.getSpecialization());
        doctorResponseDTO.setStartTime(doctor.getStartTime());
        return doctorResponseDTO;
    }
}
