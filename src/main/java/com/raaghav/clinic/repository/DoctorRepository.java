package com.raaghav.clinic.repository;

import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecializationIgnoreCase(String specialization);

    List<Doctor> findByUserIn(Collection<User> users);
}
