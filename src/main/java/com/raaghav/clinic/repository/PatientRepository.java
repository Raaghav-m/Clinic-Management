package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByUserIn(Collection<User> users);
}
