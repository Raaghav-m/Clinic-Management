package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.PrescriptionRequestDTO;
import com.raaghav.clinic.dto.PrescriptionResponseDTO;
import com.raaghav.clinic.entity.Consultation;
import com.raaghav.clinic.entity.Prescription;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.PrescriptionMapper;
import com.raaghav.clinic.repository.ConsultationRepository;
import com.raaghav.clinic.repository.PatientRepository;
import com.raaghav.clinic.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final ConsultationRepository consultationRepository;
    private final PatientRepository patientRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               ConsultationRepository consultationRepository,PatientRepository patientRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.consultationRepository = consultationRepository;
        this.patientRepository=patientRepository;
    }

    // Create
    public PrescriptionResponseDTO createPrescription(PrescriptionRequestDTO dto) {

        Prescription prescription = PrescriptionMapper.toEntity(dto);

        Consultation consultation = consultationRepository
                .findById(dto.getConsultationId())
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        prescription.setConsultation(consultation);

        Prescription saved = prescriptionRepository.save(prescription);

        return PrescriptionMapper.toDTO(saved);
    }

    // Get All
    public List<PrescriptionResponseDTO> getAllPrescriptions() {

        return prescriptionRepository.findAll()
                .stream()
                .map(PrescriptionMapper::toDTO)
                .toList();
    }

    // Get By Id
    public PrescriptionResponseDTO getPrescriptionById(Long id) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));

        return PrescriptionMapper.toDTO(prescription);
    }

    // Update
    public PrescriptionResponseDTO updatePrescription(Long id,
                                                      PrescriptionRequestDTO dto) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));

        Consultation consultation = consultationRepository.findById(dto.getConsultationId())
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        prescription.setMedicine(dto.getMedicine());
        prescription.setDosage(dto.getDosage());
        prescription.setFrequency(dto.getFrequency());
        prescription.setDuration(dto.getDuration());
        prescription.setInstructions(dto.getInstructions());
        prescription.setConsultation(consultation);

        Prescription updated = prescriptionRepository.save(prescription);

        return PrescriptionMapper.toDTO(updated);
    }

    // Delete
    public void deletePrescription(Long id) {

        if (!prescriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Prescription not found");
        }

        prescriptionRepository.deleteById(id);
    }

    public List<PrescriptionResponseDTO> getPrescriptionsByPatientId(Long id){
        patientRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("There is no patient with the given patient id"));
        return prescriptionRepository.findByConsultationAppointmentPatientId(id).stream().map(PrescriptionMapper::toDTO).toList();
    }
    public PrescriptionResponseDTO getPrescriptionsByConsultationId(Long id){
        consultationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("There is no consultation with the given id"));
        return PrescriptionMapper.toDTO(prescriptionRepository.findByConsultationId(id));
    }
}