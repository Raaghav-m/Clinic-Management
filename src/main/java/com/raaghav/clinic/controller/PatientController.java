package com.raaghav.clinic.controller;


import com.raaghav.clinic.dto.*;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.entity.Prescription;
import com.raaghav.clinic.service.AppointmentService;
import com.raaghav.clinic.service.ConsultationService;
import com.raaghav.clinic.service.PatientService;
import com.raaghav.clinic.service.PrescriptionService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService service;
    private final AppointmentService appointmentService;
    private final ConsultationService consultationService;
    private final PrescriptionService prescriptionService;
    public PatientController(PatientService service1, AppointmentService appointmentService,ConsultationService consultationService,PrescriptionService prescriptionService){
        System.out.println("controller created");
        this.service=service1;
        this.appointmentService=appointmentService;
        this.consultationService=consultationService;
        this.prescriptionService=prescriptionService;
    }
    @PostMapping
    public ResponseEntity<PatientResponseDTO> addPatient(@Valid @RequestBody PatientRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.savePatient(request));
    }
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getPatient(@PathVariable Long id){
//        System.out.println(id);
        return ResponseEntity.ok(service.getPatientById(id));
    }
    @GetMapping
    public ResponseEntity<List<PatientResponseDTO>> getAllPatients(){
        return ResponseEntity.ok(service.getAllPatients());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(@PathVariable Long id,@Valid @RequestBody PatientRequestDTO request){
        return ResponseEntity.ok(service.updatePatient(id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        service.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<List<PatientResponseDTO>> searchPatientByName(@RequestParam String name){
        return ResponseEntity.ok(service.getPatientsByName(name));
    }

    @GetMapping("/search/phone")
    public ResponseEntity<List<PatientResponseDTO>> searchByPatientPhone(@RequestParam String phone){
        return ResponseEntity.ok(service.getPatientByPhone(phone));
    }
    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<AppointmentResponseDTO>> getPatientAppointments(@PathVariable Long id){
        return ResponseEntity.ok(appointmentService.getByPatientId(id));
    }

    @GetMapping("/{id}/consultations")
    public ResponseEntity<List<ConsultationResponseDTO>> getPatientConsultation(@PathVariable Long id){
        return ResponseEntity.ok(consultationService.getConsultationsByPatientId(id));
    }
    @GetMapping("/{id}/prescriptions")
    public ResponseEntity<List<PrescriptionResponseDTO>> getPatientPrescriptions(@PathVariable Long id){
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatientId(id));
    }

}
