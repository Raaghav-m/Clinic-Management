package com.raaghav.clinic.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;


@Entity
public class Appointment {
    public enum AppointmentStatus{
        BOOKED,CANCELLED,COMPLETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name ="doctor_id")
    private Doctor doctor;

    @Column(name = "appointment_time")
    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
}
