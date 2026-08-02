package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
    private final DoctorService service;
    public DoctorController(DoctorService service){
        this.service=service;
    }

    @PostMapping
    public ResponseEntity<DoctorResponseDTO> addDoctor(@Valid @RequestBody DoctorRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addDoctor(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponseDTO>> getAllDoctors(){
        return ResponseEntity.ok().body(service.getAllDoctors());
    }
    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponseDTO> getDoctorById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.getDoctorById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponseDTO> updateDoctor(@PathVariable Long id,@Valid @RequestBody DoctorRequestDTO requestDTO){
        return ResponseEntity.ok().body(service.updateDoctor(id,requestDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        service.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

}
