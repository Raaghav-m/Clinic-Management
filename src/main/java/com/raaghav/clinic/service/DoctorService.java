package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.AppointmentResponseDTO;
import com.raaghav.clinic.dto.ConsultationResponseDTO;
import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.AppointmentMapper;
import com.raaghav.clinic.mapper.ConsultationMapper;
import com.raaghav.clinic.mapper.DoctorMapper;
import com.raaghav.clinic.repository.AppointmentRepository;
import com.raaghav.clinic.repository.ConsultationRepository;
import com.raaghav.clinic.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final ConsultationRepository consultationRepository;

    public DoctorService(DoctorRepository doctorRepository, AppointmentRepository appointmentRepository,
                         ConsultationRepository consultationRepository) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.consultationRepository = consultationRepository;
    }

    public DoctorResponseDTO addDoctor(DoctorRequestDTO doctorRequestDTO) {
        Doctor newDoctor = DoctorMapper.toEntity(doctorRequestDTO);
        Doctor savedDoctor = doctorRepository.save(newDoctor);
        return DoctorMapper.toResponse(savedDoctor);
    }

    public List<DoctorResponseDTO> getAllDoctors() {
        return doctorRepository.findAll().stream().map(DoctorMapper::toResponse).toList();
    }

    public DoctorResponseDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The doctor is not found with the given id"));
        return DoctorMapper.toResponse(doctor);
    }

    public DoctorResponseDTO updateDoctor(Long id, DoctorRequestDTO doctorRequestDTO) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("the doctor is not found with the given id"));
        DoctorMapper.updateEntity(doctor, doctorRequestDTO);
        doctorRepository.save(doctor);
        return DoctorMapper.toResponse(doctor);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("the doctor is not found with the given id"));
        doctorRepository.delete(doctor);
    }

    public List<DoctorResponseDTO> getDoctorByName(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name).stream().map(DoctorMapper::toResponse).toList();
    }

    public List<DoctorResponseDTO> getDoctorBySpecialization(String name) {
        return doctorRepository.findBySpecializationIgnoreCase(name).stream().map(DoctorMapper::toResponse).toList();
    }

    public List<AppointmentResponseDTO> getDoctorAppointments(Long id) {
        doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("the doctor is not found with the given id"));
        return appointmentRepository.findByDoctorId(id).stream().map(AppointmentMapper::toResponse).toList();
    }

    public List<ConsultationResponseDTO> getDoctorConsultations(Long id) {
        doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("the doctor is not found with the given id"));
        return consultationRepository.findByAppointmentDoctorId(id).stream().map(ConsultationMapper::toResponse).toList();
    }
}
