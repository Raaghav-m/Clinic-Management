package com.raaghav.clinic.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class AppointmentRequestDTO {
    @NotNull(message = "Patient id cannot be null")
    private Long patientId;

    @NotNull(message = "Doctor id cannot be null")
    private Long doctorId;

    @NotNull(message = "Appointment time cannot be null")
    @Future(message = "Appointment must be in the future")
    private LocalDateTime appointmentTime;

    public AppointmentRequestDTO(){}

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
