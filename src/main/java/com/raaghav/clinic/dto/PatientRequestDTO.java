package com.raaghav.clinic.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class PatientRequestDTO {
    @NotBlank(message="Names cannot be left blank")
    private String name;

    @Min(value=0,message = "Age cannot be negative")
    private Integer age;
    @NotBlank(message = "Gender is required")
    private String gender;
    @Pattern(regexp =  "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits")
    private String phone;

    public PatientRequestDTO(String name, Integer age, String gender, String phone){
        this.name=name;
        this.age=age;
        this.gender=gender;
        this.phone=phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
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
