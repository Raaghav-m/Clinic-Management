package com.raaghav.clinic.controller;

import com.raaghav.clinic.service.PrescriptionService;
import com.raaghav.clinic.dto.PrescriptionRequestDTO;
import com.raaghav.clinic.dto.PrescriptionResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    // Create Prescription
    @PostMapping
    public ResponseEntity<PrescriptionResponseDTO> createPrescription(
            @Valid @RequestBody PrescriptionRequestDTO dto) {

        PrescriptionResponseDTO response =
                prescriptionService.createPrescription(dto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get All Prescriptions
    @GetMapping
    public ResponseEntity<List<PrescriptionResponseDTO>> getAllPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getAllPrescriptions()
        );
    }

    // Get Prescription By Id
    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionResponseDTO> getPrescriptionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionById(id)
        );
    }

    // Update Prescription
    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionResponseDTO> updatePrescription(
            @PathVariable Long id,
            @Valid @RequestBody PrescriptionRequestDTO dto) {

        return ResponseEntity.ok(
                prescriptionService.updatePrescription(id, dto)
        );
    }

    // Delete Prescription
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return ResponseEntity.noContent().build();
    }
}