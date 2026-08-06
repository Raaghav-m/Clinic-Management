package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecializationIgnoreCase(String specialization);

    List<Doctor> findByUserNameContainingIgnoreCase(String name);

    java.util.Optional<Doctor> findByUser_Id(Long userId);
}
