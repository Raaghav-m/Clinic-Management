package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.AuthenticationResponseDTO;
import com.raaghav.clinic.dto.RegisterRequestDTO;
import com.raaghav.clinic.entity.Role;
import com.raaghav.clinic.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthenticationMapper {
    public static AuthenticationResponseDTO toResponse(String token){
        AuthenticationResponseDTO authenticationResponseDTO=new AuthenticationResponseDTO();
        authenticationResponseDTO.setToken(token);
        return authenticationResponseDTO;
    }
    public static User toEntity(RegisterRequestDTO registerRequestDTO){
        User user=new User();
        user.setName(registerRequestDTO.getName());
        user.setPassword(registerRequestDTO.getPassword());

        user.setEmail(registerRequestDTO.getEmail());
        user.setPhone(registerRequestDTO.getPhone());
        return user;
    }
}
