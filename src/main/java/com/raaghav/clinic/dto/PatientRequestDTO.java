package com.raaghav.clinic.dto;

import jakarta.validation.constraints.*;

public class PatientRequestDTO {
    @NotBlank(message = "Names cannot be left blank")
    @Size(max = 60)
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email must be valid")
    @Size(max = 40)
    private String email;

    @NotBlank(message = "Gender is required")
    private String gender;

    @Pattern(regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits")
    private String phone;

    public PatientRequestDTO() {
    }

    public PatientRequestDTO(String name, String email, String gender, String phone) {
        this.name = name;
        this.email = email;
        this.gender = gender;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
