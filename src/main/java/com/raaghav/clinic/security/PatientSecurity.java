package com.raaghav.clinic.security;

import com.raaghav.clinic.entity.User;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("patientSecurity")
public class PatientSecurity {

    private final PatientRepository patientRepository;

    public PatientSecurity(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public boolean isOwner(Long patientId, Authentication authentication) {
        if (patientId == null || authentication == null || authentication.getPrincipal() == null) {
            return false;
        }
        if (!(authentication.getPrincipal() instanceof User user)) {
            return false;
        }

        return patientRepository.findById(patientId)
                .map(patient -> patient.getUser() != null && user.getId().equals(patient.getUser().getId()))
                .orElse(false);
    }
}
