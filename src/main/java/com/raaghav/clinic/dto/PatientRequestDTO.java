package com.raaghav.clinic.dto;

public class PatientRequestDTO {
    private String name;
    private Integer age;
    private String gender;
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
