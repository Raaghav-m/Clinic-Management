package com.raaghav.clinic.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

@Entity
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60)
    private String symptoms;
    @Column(length = 100)
    private String diagnosis;

    @Column(length = 100)
    private String notes;

    @OneToOne
    @JoinColumn(name = "appointment_id",unique = true)
    private Appointment appointment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
