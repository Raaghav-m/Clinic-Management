package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.ConsultationRequestDTO;
import com.raaghav.clinic.dto.ConsultationResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Consultation;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.ConsultationMapper;
import com.raaghav.clinic.repository.AppointmentRepository;
import com.raaghav.clinic.repository.ConsultationRepository;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {
    private final ConsultationRepository consultationRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    public ConsultationService(ConsultationRepository consultationRepository,
                               AppointmentRepository appointmentRepository, PatientRepository patientRepository) {
        this.consultationRepository = consultationRepository;
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    @PreAuthorize("hasRole('DOCTOR')")
    public ConsultationResponseDTO createConsultation(ConsultationRequestDTO request) {
        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment with given appointment id is not found"));
        if (appointment.getStatus() == Appointment.AppointmentStatus.CANCELLED) {
            throw new IllegalStateException("Cannot record consultation for a cancelled appointment");
        }
        Consultation consultation = ConsultationMapper.toEntity(request, appointment);
        Consultation savedConsultation = consultationRepository.save(consultation);
        if (appointment.getStatus() == Appointment.AppointmentStatus.BOOKED) {
            appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
            appointmentRepository.save(appointment);
        }
        return ConsultationMapper.toResponse(savedConsultation);
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<ConsultationResponseDTO> getAllConsultations() {
        return consultationRepository.findAll().stream().map(ConsultationMapper::toResponse).toList();
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ConsultationResponseDTO getConsultationById(Long id) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("consultation with the given id is not found"));
        return ConsultationMapper.toResponse(consultation);
    }

    @PreAuthorize("hasRole('DOCTOR')")
    public ConsultationResponseDTO updateConsultation(Long id, ConsultationRequestDTO requestDTO) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("consultation with the given id is not found"));
        Appointment appointment = appointmentRepository.findById(requestDTO.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment with given appointment id is not found"));

        consultation.setAppointment(appointment);
        consultation.setSymptoms(requestDTO.getSymptoms());
        consultation.setNotes(requestDTO.getNotes());
        consultation.setDiagnosis(requestDTO.getDiagnosis());
        Consultation newConsultation = consultationRepository.save(consultation);
        return ConsultationMapper.toResponse(newConsultation);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteConsultation(Long id) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("consultation with the given id is not found"));
        Appointment appointment = consultation.getAppointment();
        appointment.setConsultation(null);

        consultationRepository.delete(consultation);
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR') or @patientSecurity.isOwner(#id, authentication)")
    public List<ConsultationResponseDTO> getConsultationsByPatientId(Long id) {
        patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The patient is not found with the given id"));
        return consultationRepository.findByAppointmentPatientId(id).stream().map(ConsultationMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ConsultationResponseDTO getConsultationByAppointmentId(Long id) {
        appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The appointment with the given id is not found"));
        return ConsultationMapper.toResponse(consultationRepository.findByAppointmentId(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<ConsultationResponseDTO> getConsultationByDiagnosis(String diagnosis) {
        return consultationRepository.findByDiagnosisContainingIgnoreCase(diagnosis).stream()
                .map(ConsultationMapper::toResponse).toList();
    }
}
