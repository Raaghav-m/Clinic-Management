package com.raaghav.clinic.controller;


import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.service.PatientService;
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
    public Patient addPatient(@RequestBody Patient patient){
        return service.savePatient(patient);
    }

}
