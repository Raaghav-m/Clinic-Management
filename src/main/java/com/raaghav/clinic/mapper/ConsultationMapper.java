package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.ConsultationRequestDTO;
import com.raaghav.clinic.dto.ConsultationResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Consultation;

public class ConsultationMapper {
    public static Consultation toEntity(ConsultationRequestDTO requestDTO, Appointment appointment){
        Consultation consultation=new Consultation();
        consultation.setDiagnosis(requestDTO.getDiagnosis());
        consultation.setNotes(requestDTO.getNotes());
        consultation.setSymptoms(requestDTO.getSymptoms());
        consultation.setAppointment(appointment);
        return consultation;
    }
    public static ConsultationResponseDTO toResponse(Consultation consultation){
        ConsultationResponseDTO consultationResponseDTO=new ConsultationResponseDTO();
        consultationResponseDTO.setDiagnosis(consultation.getDiagnosis());
        consultationResponseDTO.setNotes(consultation.getNotes());
        consultationResponseDTO.setSymptoms(consultation.getSymptoms());
        consultationResponseDTO.setId(consultation.getId());
        consultationResponseDTO.setAppointmentId(consultation.getAppointment().getId());
        return consultationResponseDTO;
    }
}
