package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ConsultationRepository extends JpaRepository<Consultation,Long> {
    List<Consultation> findByAppointmentPatientId(Long id);
    Integer countByAppointmentPatientId(Long id);
    Consultation findFirstByAppointmentPatientIdOrderByAppointmentAppointmentTimeDesc(Long id);
}
