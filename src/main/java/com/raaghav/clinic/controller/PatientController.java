package com.raaghav.clinic.controller;


import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService service;
    public PatientController(PatientService service1){
        System.out.println("controller created");
        this.service=service1;
    }
    @PostMapping
    public PatientResponseDTO addPatient(@Valid @RequestBody PatientRequestDTO request){
        return service.savePatient(request);
    }

}
