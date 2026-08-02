package com.raaghav.clinic.dto;

import com.raaghav.clinic.entity.Consultation;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ConsultationRequestDTO {
    @NotNull
    @Size(max = 60)
    private String symptoms;

    @Size(max = 100)
    private String diagnosis;

    @Size(max = 100)
    private String notes;

    @NotNull(message = "There must be a appointment tied to this consultation")
    private Long appointmentId;

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public ConsultationRequestDTO(){}

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
