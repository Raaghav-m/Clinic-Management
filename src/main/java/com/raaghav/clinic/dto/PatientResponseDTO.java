package com.raaghav.clinic.dto;

public class PatientResponseDTO {
    private String name;
    private String email;
    private Long id;
    private Integer age;
    private String gender;
    private String phone;

    public PatientResponseDTO() {
    }

    public PatientResponseDTO(Long id, String name, String email, Integer age, String gender, String phone) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.age = age;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
