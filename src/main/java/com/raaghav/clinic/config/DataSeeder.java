package com.raaghav.clinic.config;

import com.raaghav.clinic.entity.*;
import com.raaghav.clinic.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Configuration
public class DataSeeder {

    public static final String DEFAULT_PASSWORD = "Password@123";

    @Bean
    @Profile("seed")
    CommandLineRunner seedDatabase(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository,
            ConsultationRepository consultationRepository,
            PrescriptionRepository prescriptionRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            String encodedPassword = passwordEncoder.encode(DEFAULT_PASSWORD);

            // 1 admin
            userRepository.save(user("Clinic Admin", "admin@clinic.com", "9000000001",
                    Role.ADMIN, encodedPassword));

            // 2 receptionists
            userRepository.saveAll(java.util.List.of(
                    user("Anita Reception", "receptionist1@clinic.com", "9000000002",
                            Role.RECEPTIONIST, encodedPassword),
                    user("Ravi FrontDesk", "receptionist2@clinic.com", "9000000003",
                            Role.RECEPTIONIST, encodedPassword)
            ));

            // 6 patients
            var patients = patientRepository.saveAll(java.util.List.of(
                    patient("Priya Sharma", "Female", "9876543210", "priya.sharma@gmail.com",
                            "14 MG Road, Koramangala, Bangalore", "9123456780", "O+", encodedPassword),
                    patient("Arjun Mehta", "Male", "9823456710", "arjun.mehta@yahoo.com",
                            "22 Park Street, Kolkata", "9834567890", "A+", encodedPassword),
                    patient("Lakshmi Iyer", "Female", "9845678901", "lakshmi.iyer@outlook.com",
                            "8 Anna Salai, T Nagar, Chennai", "9856789012", "B+", encodedPassword),
                    patient("Rahul Kapoor", "Male", "9867890123", "rahul.kapoor@gmail.com",
                            "5 Bandra West, Mumbai", "9878901234", "AB+", encodedPassword),
                    patient("Sneha Patel", "Female", "9889012345", "sneha.patel@hotmail.com",
                            "19 SG Highway, Ahmedabad", "9890123456", "O+", encodedPassword),
                    patient("Mohammed Farhan", "Male", "9901234567", "farhan.khan@gmail.com",
                            "3 Banjara Hills, Hyderabad", "9912345678", "A+", encodedPassword)
            ));

            // 5 doctors
            var doctors = doctorRepository.saveAll(java.util.List.of(
                    doctor("Dr. Ananya Reddy", "Cardiology", 15, 1500.0, "09:00", "17:00",
                            "9876000001", "ananya.reddy@clinic.com", encodedPassword),
                    doctor("Dr. Vikram Singh", "Orthopedics", 12, 1200.0, "10:00", "18:00",
                            "9876000002", "vikram.singh@clinic.com", encodedPassword),
                    doctor("Dr. Meera Joshi", "Dermatology", 8, 800.0, "09:30", "16:30",
                            "9876000003", "meera.joshi@clinic.com", encodedPassword),
                    doctor("Dr. Rajesh Kumar", "General Medicine", 20, 600.0, "08:00", "20:00",
                            "9876000004", "rajesh.kumar@clinic.com", encodedPassword),
                    doctor("Dr. Sunita Rao", "Pediatrics", 10, 900.0, "09:00", "15:00",
                            "9876000005", "sunita.rao@clinic.com", encodedPassword)
            ));

            var appointments = appointmentRepository.saveAll(java.util.List.of(
                    appointment(patients.get(0), doctors.get(0), "2026-07-15T10:00",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(1), doctors.get(1), "2026-07-18T11:30",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(2), doctors.get(2), "2026-07-20T14:00",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(3), doctors.get(3), "2026-07-22T09:00",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(4), doctors.get(4), "2026-07-25T10:30",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(5), doctors.get(0), "2026-07-28T15:00",
                            Appointment.AppointmentStatus.COMPLETED),
                    appointment(patients.get(0), doctors.get(3), "2026-08-10T16:00",
                            Appointment.AppointmentStatus.BOOKED),
                    appointment(patients.get(1), doctors.get(0), "2026-08-12T10:00",
                            Appointment.AppointmentStatus.CANCELLED)
            ));

            var consultations = consultationRepository.saveAll(java.util.List.of(
                    consultation(appointments.get(0), "Chest pain, breathlessness on exertion",
                            "Stable angina, mild hypertension",
                            "ECG shows ST depression. Advised lifestyle changes and follow-up in 4 weeks."),
                    consultation(appointments.get(1), "Knee pain, swelling after morning walk",
                            "Early osteoarthritis, right knee",
                            "X-ray: mild joint space narrowing. Physiotherapy recommended."),
                    consultation(appointments.get(2), "Itchy rash on arms, redness for 2 weeks",
                            "Contact dermatitis",
                            "Patch test suggested. Avoid harsh soaps and synthetic fabrics."),
                    consultation(appointments.get(3), "Fever, sore throat, body ache for 3 days",
                            "Viral upper respiratory infection",
                            "Rest and hydration advised. Return if fever persists beyond 5 days."),
                    consultation(appointments.get(4), "Child: cough, runny nose, low-grade fever",
                            "Acute viral bronchitis",
                            "Parent counselled on steam inhalation. No antibiotics needed currently."),
                    consultation(appointments.get(5), "Recurrent headaches, blurred vision episodes",
                            "Tension-type headache, rule out migraine",
                            "MRI scheduled. Maintain sleep diary and reduce screen time.")
            ));

            prescriptionRepository.saveAll(java.util.List.of(
                    prescription(consultations.get(0), "Amlodipine 5mg + Aspirin 75mg", "1 tablet each",
                            "Once daily after breakfast", "30 days", "Monitor BP at home. Avoid skipping doses."),
                    prescription(consultations.get(1), "Diclofenac 50mg + Glucosamine 750mg",
                            "1 tab Diclofenac, 1 cap Glucosamine", "Twice daily after meals", "14 days",
                            "Apply ice pack if swelling increases. Avoid squatting."),
                    prescription(consultations.get(2), "Cetirizine 10mg + Hydrocortisone 1% cream",
                            "1 tablet + thin layer on rash", "Tablet at night, cream twice daily", "7 days",
                            "Do not scratch affected areas. Wear loose cotton clothing."),
                    prescription(consultations.get(3), "Paracetamol 650mg + Ambroxol syrup",
                            "1 tablet / 10ml syrup", "Three times daily", "5 days",
                            "Take plenty of fluids. Complete full course even if feeling better."),
                    prescription(consultations.get(4), "Salbutamol inhaler + Montelukast 4mg chewable",
                            "2 puffs / 1 tablet", "Inhaler as needed, tablet at bedtime", "7 days",
                            "Use spacer with inhaler. Seek care if breathing worsens."),
                    prescription(consultations.get(5), "Propranolol 40mg + Sumatriptan 50mg",
                            "1 tab Propranolol daily, Sumatriptan PRN", "Daily + at headache onset", "30 days",
                            "Avoid triggers: stress, skipped meals. Do not exceed 2 Sumatriptan/day.")
            ));

            System.out.println("========== SEED CREDENTIALS ==========");
            System.out.println("Password for ALL users: " + DEFAULT_PASSWORD);
            System.out.println("Admin:          admin@clinic.com");
            System.out.println("Receptionist 1: receptionist1@clinic.com");
            System.out.println("Receptionist 2: receptionist2@clinic.com");
            System.out.println("Doctor:         ananya.reddy@clinic.com");
            System.out.println("Patient:        priya.sharma@gmail.com");
            System.out.println("======================================");
        };
    }

    private static User user(String name, String email, String phone, Role role, String encodedPassword) {
        var user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setRole(role);
        user.setPassword(encodedPassword);
        return user;
    }

    private static Patient patient(String name, String gender, String phone, String email,
                                   String address, String emergencyContact, String bloodGroup,
                                   String encodedPassword) {
        var p = new Patient();
        p.setUser(user(name, email, phone, Role.PATIENT, encodedPassword));
        p.setGender(gender);
        p.setAddress(address);
        p.setEmergencyContact(emergencyContact);
        p.setBloodGroup(bloodGroup);
        return p;
    }

    private static Doctor doctor(String name, String specialization, int experience, double fee,
                                 String start, String end, String phone, String email,
                                 String encodedPassword) {
        var d = new Doctor();
        d.setUser(user(name, email, phone, Role.DOCTOR, encodedPassword));
        d.setSpecialization(specialization);
        d.setExperience(experience);
        d.setConsultationFee(fee);
        d.setStartTime(LocalTime.parse(start));
        d.setEndTime(LocalTime.parse(end));
        return d;
    }

    private static Appointment appointment(Patient patient, Doctor doctor, String time,
                                           Appointment.AppointmentStatus status) {
        var a = new Appointment();
        a.setPatient(patient);
        a.setDoctor(doctor);
        a.setAppointmentTime(LocalDateTime.parse(time));
        a.setStatus(status);
        return a;
    }

    private static Consultation consultation(Appointment appointment, String symptoms,
                                             String diagnosis, String notes) {
        var c = new Consultation();
        c.setAppointment(appointment);
        c.setSymptoms(symptoms);
        c.setDiagnosis(diagnosis);
        c.setNotes(notes);
        return c;
    }

    private static Prescription prescription(Consultation consultation, String medicine, String dosage,
                                             String frequency, String duration, String instructions) {
        var p = new Prescription();
        p.setConsultation(consultation);
        p.setMedicine(medicine);
        p.setDosage(dosage);
        p.setFrequency(frequency);
        p.setDuration(duration);
        p.setInstructions(instructions);
        return p;
    }
}
