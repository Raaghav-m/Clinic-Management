package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.AppointmentRequestDTO;
import com.raaghav.clinic.dto.AppointmentResponseDTO;
import com.raaghav.clinic.entity.Appointment;
import com.raaghav.clinic.entity.Doctor;
import com.raaghav.clinic.entity.Patient;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.AppointmentMapper;
import com.raaghav.clinic.mapper.DoctorMapper;
import com.raaghav.clinic.repository.AppointmentRepository;
import com.raaghav.clinic.repository.DoctorRepository;
import com.raaghav.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    public AppointmentService(AppointmentRepository repository, PatientRepository patientRepository, DoctorRepository doctorRepository){
        this.appointmentRepository=repository;
        this.patientRepository=patientRepository;
        this.doctorRepository=doctorRepository;
    }
    public AppointmentResponseDTO bookAppointment(AppointmentRequestDTO request){
        Doctor doctor=doctorRepository.findById(request.getDoctorId()).orElseThrow(()->new ResourceNotFoundException("there is no doctor with the given id"));
        Patient patient=patientRepository.findById(request.getPatientId()).orElseThrow(()->new ResourceNotFoundException("there is no patient with the given patient id"));

        Appointment appointment= AppointmentMapper.toEntity(request,doctor,patient);
        appointment.setStatus(Appointment.AppointmentStatus.BOOKED);
        Appointment savedAppointment=appointmentRepository.save(appointment);
        return AppointmentMapper.toResponse(savedAppointment);
    }

    public List<AppointmentResponseDTO> getAllAppointments(){
        return appointmentRepository.findAll().stream().map(AppointmentMapper::toResponse).toList();
    }
    public AppointmentResponseDTO getAppointmentById(Long id){
        Appointment appointment=appointmentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("the appointment with the given id is not found"));
        return AppointmentMapper.toResponse(appointment);
    }
    public AppointmentResponseDTO updateAppointment(Long id,AppointmentRequestDTO appointment){
        Appointment newAppointment=appointmentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("the appointment with the given id is not found"));
        Patient patient=patientRepository.findById(appointment.getPatientId()).orElseThrow(()->new ResourceNotFoundException("the patient id is not found"));
        newAppointment.setPatient(patient);
        Doctor doctor=doctorRepository.findById(appointment.getDoctorId()).orElseThrow(()->new ResourceNotFoundException("the doctor id is not found"));
        newAppointment.setDoctor(doctor);
        newAppointment.setAppointmentTime(appointment.getAppointmentTime());
        Appointment savedAppointment=appointmentRepository.save(newAppointment);
        return AppointmentMapper.toResponse(savedAppointment);
    }
    public void deleteAppointment(Long id){
        Appointment appointment=appointmentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("the appointment with the given id is not found"));
        appointmentRepository.delete(appointment);

    }
    public List<AppointmentResponseDTO> getByPatientId(Long id){
        patientRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The given Patient id is not found"));
        return appointmentRepository.findByPatientId(id).stream().map(AppointmentMapper::toResponse).toList();
    }

}
