package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("SELECT p FROM Patient p WHERE LOWER(p.user.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Patient> findByNameContainingIgnoreCase(@Param("name") String name);

    @Query("SELECT p FROM Patient p WHERE p.user.phone LIKE CONCAT('%', :phone, '%')")
    List<Patient> findByPhoneContaining(@Param("phone") String phone);
}
