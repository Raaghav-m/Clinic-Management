package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByUserNameContainingIgnoreCase(String name);

    List<Patient> findByUserPhoneContaining(String phone);
}
