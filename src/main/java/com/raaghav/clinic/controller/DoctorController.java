package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.DoctorRequestDTO;
import com.raaghav.clinic.dto.DoctorResponseDTO;
import com.raaghav.clinic.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

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
}
