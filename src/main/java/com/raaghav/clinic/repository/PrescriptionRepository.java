package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription,Long> {
     List<Prescription> findByConsultationAppointmentPatientId(Long id);
}
