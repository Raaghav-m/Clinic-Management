package com.raaghav.clinic.dto;

import java.time.LocalDateTime;

public class PatientSummaryResponseDTO {

    private Long id;
    private String patientName;
    private String phone;
    private int totalAppointments;
    private int completedAppointments;
    private int cancelledAppointments;
    private int upcomingAppointments;
    private int totalConsultations;
    private int totalPrescriptions;
    private LocalDateTime lastAppointmentDate;
    private LocalDateTime lastConsultationDate;

    public PatientSummaryResponseDTO(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(int totalAppointments) {
        this.totalAppointments = totalAppointments;
    }

    public int getCompletedAppointments() {
        return completedAppointments;
    }

    public void setCompletedAppointments(int completedAppointments) {
        this.completedAppointments = completedAppointments;
    }

    public int getCancelledAppointments() {
        return cancelledAppointments;
    }

    public void setCancelledAppointments(int cancelledAppointments) {
        this.cancelledAppointments = cancelledAppointments;
    }

    public int getUpcomingAppointments() {
        return upcomingAppointments;
    }

    public void setUpcomingAppointments(int upcomingAppointments) {
        this.upcomingAppointments = upcomingAppointments;
    }

    public int getTotalConsultations() {
        return totalConsultations;
    }

    public void setTotalConsultations(int totalConsultations) {
        this.totalConsultations = totalConsultations;
    }

    public int getTotalPrescriptions() {
        return totalPrescriptions;
    }

    public void setTotalPrescriptions(int totalPrescriptions) {
        this.totalPrescriptions = totalPrescriptions;
    }

    public LocalDateTime getLastAppointmentDate() {
        return lastAppointmentDate;
    }

    public void setLastAppointmentDate(LocalDateTime lastAppointmentDate) {
        this.lastAppointmentDate = lastAppointmentDate;
    }

    public LocalDateTime getLastConsultationDate() {
        return lastConsultationDate;
    }

    public void setLastConsultationDate(LocalDateTime lastConsultationDate) {
        this.lastConsultationDate = lastConsultationDate;
    }
}
