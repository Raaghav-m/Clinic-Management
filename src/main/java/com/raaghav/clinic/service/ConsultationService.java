package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.AppointmentResponseDTO;
import com.raaghav.clinic.dto.ConsultationRequestDTO;
import com.raaghav.clinic.dto.ConsultationResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Consultation;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.ConsultationMapper;
import com.raaghav.clinic.repository.AppointmentRepository;
import com.raaghav.clinic.repository.ConsultationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {
    private final ConsultationRepository consultationRepository;
    private final AppointmentRepository appointmentRepository;
    public ConsultationService(ConsultationRepository consultationRepository, AppointmentRepository appointmentRepository){
        this.consultationRepository=consultationRepository;
        this.appointmentRepository=appointmentRepository;
    }
    public ConsultationResponseDTO createConsultation(ConsultationRequestDTO request){
        Appointment appointment=appointmentRepository.findById(request.getAppointmentId()).orElseThrow(()->new ResourceNotFoundException("Appointment with given appointment id is not found"));
        Consultation consultation= ConsultationMapper.toEntity(request,appointment);
        Consultation savedConsultation=consultationRepository.save(consultation);
        return ConsultationMapper.toResponse(savedConsultation);
    }
    public List<ConsultationResponseDTO> getAllConsultations(){
        return consultationRepository.findAll().stream().map(ConsultationMapper::toResponse).toList();
    }
    public ConsultationResponseDTO getConsultationById(Long id){
        Consultation consultation=consultationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("consultation with the given id is not found"));
        return ConsultationMapper.toResponse(consultation);
    }
    public ConsultationResponseDTO updateConsultation(Long id,ConsultationRequestDTO requestDTO){
        Consultation consultation=consultationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("consultation with the given id is not found"));
        Appointment appointment=appointmentRepository.findById(requestDTO.getAppointmentId()).orElseThrow(()->new ResourceNotFoundException("Appointment with given appointment id is not found"));

        consultation.setAppointment(appointment);
        consultation.setSymptoms(requestDTO.getSymptoms());
        consultation.setNotes(requestDTO.getNotes());
        consultation.setDiagnosis(requestDTO.getDiagnosis());
        Consultation newConsultation=consultationRepository.save(consultation);
        return ConsultationMapper.toResponse(newConsultation);
    }
    public void deleteConsultation(Long id){
        Consultation consultation=consultationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("consultation with the given id is not found"));
        Appointment appointment = consultation.getAppointment();
        appointment.setConsultation(null);

        consultationRepository.delete(consultation);
    }


}
