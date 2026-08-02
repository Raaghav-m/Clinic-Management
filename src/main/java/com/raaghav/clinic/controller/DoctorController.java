package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.service.DoctorService;
import jakarta.validation.Valid;
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
    public DoctorResponseDTO addDoctor(@Valid @RequestBody DoctorRequestDTO requestDTO){
        return service.addDoctor(requestDTO);
    }

    @GetMapping
    public List<DoctorResponseDTO> getAllDoctors(){
        return service.getAllDoctors();
    }
    @GetMapping("/{id}")
    public DoctorResponseDTO getDoctorById(@PathVariable Long id){
        return service.getDoctorById(id);
    }
    @PutMapping("/{id}")
    public DoctorResponseDTO updateDoctor(@PathVariable Long id,@Valid @RequestBody DoctorRequestDTO requestDTO){
        return service.updateDoctor(id,requestDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        service.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

}
