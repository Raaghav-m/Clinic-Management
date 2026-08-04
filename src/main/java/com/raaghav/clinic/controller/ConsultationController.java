package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.ConsultationRequestDTO;
import com.raaghav.clinic.dto.ConsultationResponseDTO;
import com.raaghav.clinic.entity.Consultation;
import com.raaghav.clinic.service.ConsultationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultation")
public class ConsultationController {
    private final ConsultationService service;
    public ConsultationController(ConsultationService service){
        this.service=service;
    }
    @PostMapping
    public ResponseEntity<ConsultationResponseDTO> addConsultation(@Valid @RequestBody ConsultationRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createConsultation(requestDTO));
    }
    @GetMapping
    public ResponseEntity<List<ConsultationResponseDTO>> getAllConsultations(){
        return ResponseEntity.ok().body(service.getAllConsultations());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ConsultationResponseDTO> getConsultationById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.getConsultationById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ConsultationResponseDTO> updateConsultation(@PathVariable Long id, @Valid @RequestBody ConsultationRequestDTO consultationRequestDTO){
        return ResponseEntity.ok().body(service.updateConsultation(id,consultationRequestDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id){
        service.deleteConsultation(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<ConsultationResponseDTO> getConsultationByAppointmentId(@PathVariable Long appointmentId){
        return ResponseEntity.ok().body(service.getConsultationByAppointmentId(appointmentId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ConsultationResponseDTO>> getConsultationByDiagnosis(@RequestParam String diagnosis){
        return ResponseEntity.ok().body(service.getConsultationByDiagnosis(diagnosis));
    }

}
