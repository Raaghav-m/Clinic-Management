package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.PrescriptionRequestDTO;
import com.raaghav.clinic.dto.PrescriptionResponseDTO;
import com.raaghav.clinic.entity.Prescription;

public class PrescriptionMapper {

    public static Prescription toEntity(PrescriptionRequestDTO dto) {

        Prescription prescription = new Prescription();

        prescription.setMedicine(dto.getMedicine());
        prescription.setDosage(dto.getDosage());
        prescription.setFrequency(dto.getFrequency());
        prescription.setDuration(dto.getDuration());
        prescription.setInstructions(dto.getInstructions());

        return prescription;
    }

    public static PrescriptionResponseDTO toDTO(Prescription prescription) {

        PrescriptionResponseDTO dto = new PrescriptionResponseDTO();

        dto.setId(prescription.getId());
        dto.setMedicineName(prescription.getMedicine());
        dto.setDosage(prescription.getDosage());
        dto.setFrequency(prescription.getFrequency());
        dto.setDuration(prescription.getDuration());
        dto.setInstructions(prescription.getInstructions());

        if (prescription.getConsultation() != null) {
            dto.setConsultationId(
                    prescription.getConsultation().getId()
            );
        }

        return dto;
    }
}