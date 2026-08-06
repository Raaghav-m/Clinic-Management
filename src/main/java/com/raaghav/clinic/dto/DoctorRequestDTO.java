package com.raaghav.clinic.dto;

import jakarta.validation.constraints.*;

import java.time.LocalTime;

public class DoctorRequestDTO {
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 60)
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email must be valid")
    @Size(max = 40)
    private String email;

    @Size(max = 60)
    private String specialization;

    @Min(value = 0, message = "Experience cannot be negative")
    private int experience;

    @Positive(message = "Consultation fee cannot be negative")
    private Double consultationFee;

    private LocalTime startTime;
    private LocalTime endTime;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits")
    private String phone;

    public DoctorRequestDTO() {
    }

    public DoctorRequestDTO(String name, String email, String specialization,
                            int experience, Double consultationFee, LocalTime startTime,
                            LocalTime endTime, String phone) {
        this.name = name;
        this.email = email;
        this.consultationFee = consultationFee;
        this.endTime = endTime;
        this.experience = experience;
        this.startTime = startTime;
        this.specialization = specialization;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public Double getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(Double consultationFee) {
        this.consultationFee = consultationFee;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
