package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.AppointmentRequestDTO;
import com.raaghav.clinic.dto.AppointmentResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.entity.Patient;

public class AppointmentMapper {
    public static Appointment toEntity(AppointmentRequestDTO requestDTO, Doctor doctor, Patient patient){
        Appointment appointment=new Appointment();
        appointment.setAppointmentTime(requestDTO.getAppointmentTime());
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);

        return appointment;
    }
    public static AppointmentResponseDTO toResponse(Appointment appointment){
        AppointmentResponseDTO appointmentResponseDTO=new AppointmentResponseDTO();
        appointmentResponseDTO.setAppointmentTime(appointment.getAppointmentTime());
        appointmentResponseDTO.setDoctorId(appointment.getDoctor().getId());
        appointmentResponseDTO.setStatus(appointment.getStatus());
        appointmentResponseDTO.setPatientId(appointment.getPatient().getId());
        appointmentResponseDTO.setDoctorName(appointment.getDoctor().getName());
        appointmentResponseDTO.setPatientName(appointment.getPatient().getName());
        appointmentResponseDTO.setId(appointment.getId());
        return appointmentResponseDTO;
    }
}
