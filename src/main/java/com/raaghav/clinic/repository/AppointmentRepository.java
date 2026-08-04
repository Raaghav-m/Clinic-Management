package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByPatientId(Long id);
    Integer countByPatientId(Long id);
    Integer countByPatientIdAndStatus(Long id, Appointment.AppointmentStatus status);
    LocalDateTime findFirstByPatientIdOrderByAppointmentTimeDesc(Long id, LocalDateTime time);


}
