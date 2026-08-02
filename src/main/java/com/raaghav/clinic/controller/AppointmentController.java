package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.AppointmentRequestDTO;
import com.raaghav.clinic.dto.AppointmentResponseDTO;
import com.raaghav.clinic.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;
    public AppointmentController(AppointmentService service){
        this.appointmentService=service;
    }
    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> addAppointment(@Valid @RequestBody AppointmentRequestDTO request){
        return ResponseEntity.ok().body(appointmentService.bookAppointment(request));
    }
    @GetMapping
    public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments(){
        return ResponseEntity.ok().body(appointmentService.getAllAppointments());
    }
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointment(@PathVariable Long id){
        return ResponseEntity.ok().body(appointmentService.getAppointmentById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long id,@RequestBody AppointmentRequestDTO request){
        return ResponseEntity.ok().body(appointmentService.updateAppointment(id,request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id){
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

}
