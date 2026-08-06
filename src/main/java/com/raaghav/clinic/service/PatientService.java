package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.PatientRequestDTO;
import com.raaghav.clinic.dto.PatientResponseDTO;
import com.raaghav.clinic.dto.PatientSummaryResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.PatientMapper;
import com.raaghav.clinic.repository.AppointmentRepository;
import com.raaghav.clinic.repository.ConsultationRepository;
import com.raaghav.clinic.repository.PatientRepository;
import com.raaghav.clinic.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final ConsultationRepository consultationRepository;
    private final PrescriptionRepository prescriptionRepository;

    public PatientService(PatientRepository patientRepository, ConsultationRepository consultationRepository,
                          PrescriptionRepository prescriptionRepository, AppointmentRepository appointmentRepository) {
        this.patientRepository = patientRepository;
        this.consultationRepository = consultationRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public PatientResponseDTO savePatient(PatientRequestDTO request) {
        Patient patient = PatientMapper.toEntity(request);
        Patient savedPatient = patientRepository.save(patient);
        return PatientMapper.toResponse(savedPatient);
    }

    public PatientResponseDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with given id"));
        return PatientMapper.toResponse(patient);
    }

    public List<PatientResponseDTO> getAllPatients() {
        return patientRepository.findAll().stream().map(PatientMapper::toResponse).toList();
    }

    public PatientResponseDTO updatePatient(Long id, PatientRequestDTO request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with the id is not found"));
        PatientMapper.updateEntity(patient, request);
        patientRepository.save(patient);
        return PatientMapper.toResponse(patient);
    }

    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with the id is not found"));
        patientRepository.delete(patient);
    }

    public List<PatientResponseDTO> getPatientsByName(String searchString) {
        return patientRepository.findByUserNameContainingIgnoreCase(searchString).stream()
                .map(PatientMapper::toResponse).toList();
    }

    public List<PatientResponseDTO> getPatientByPhone(String phone) {
        return patientRepository.findByUserPhoneContaining(phone).stream()
                .map(PatientMapper::toResponse).toList();
    }

    public PatientSummaryResponseDTO getPatientSummary(Long id) {
        PatientSummaryResponseDTO patientSummaryResponseDTO = new PatientSummaryResponseDTO();
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("the patient with the given id is not found"));

        patientSummaryResponseDTO.setId(id);
        patientSummaryResponseDTO.setPatientName(patient.getUser().getName());
        patientSummaryResponseDTO.setPhone(patient.getUser().getPhone());
        patientSummaryResponseDTO.setTotalAppointments(appointmentRepository.countByPatientId(id));
        patientSummaryResponseDTO.setCompletedAppointments(
                appointmentRepository.countByPatientIdAndStatus(id, Appointment.AppointmentStatus.COMPLETED));
        patientSummaryResponseDTO.setCancelledAppointments(
                appointmentRepository.countByPatientIdAndStatus(id, Appointment.AppointmentStatus.CANCELLED));
        patientSummaryResponseDTO.setUpcomingAppointments(
                appointmentRepository.countByPatientIdAndStatus(id, Appointment.AppointmentStatus.BOOKED));
        patientSummaryResponseDTO.setTotalConsultations(consultationRepository.countByAppointmentPatientId(id));
        patientSummaryResponseDTO.setTotalPrescriptions(
                prescriptionRepository.countByConsultationAppointmentPatientId(id));
        patientSummaryResponseDTO.setLastAppointmentDate(
                appointmentRepository.findFirstByPatientIdOrderByAppointmentTimeDesc(id, LocalDateTime.now())
                        .getAppointmentTime());
        patientSummaryResponseDTO.setLastConsultationDate(
                consultationRepository.findFirstByAppointmentPatientIdOrderByAppointmentAppointmentTimeDesc(id)
                        .getAppointment().getAppointmentTime());
        return patientSummaryResponseDTO;
    }
}
