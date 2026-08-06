package com.raaghav.clinic.mapper;

import com.raaghav.clinic.dto.AuthenticationResponseDTO;
import com.raaghav.clinic.dto.RegisterRequestDTO;
import com.raaghav.clinic.entity.Role;
import com.raaghav.clinic.entity.User;

public class AuthenticationMapper {
    public static AuthenticationResponseDTO toResponse(String token, User user, Long profileId) {
        AuthenticationResponseDTO authenticationResponseDTO = new AuthenticationResponseDTO();
        authenticationResponseDTO.setToken(token);
        authenticationResponseDTO.setId(user.getId());
        authenticationResponseDTO.setName(user.getName());
        authenticationResponseDTO.setEmail(user.getEmail());
        authenticationResponseDTO.setRole(user.getRole());
        authenticationResponseDTO.setProfileId(profileId);
        return authenticationResponseDTO;
    }

    public static User toEntity(RegisterRequestDTO registerRequestDTO) {
        User user = new User();
        user.setName(registerRequestDTO.getName());
        user.setPassword(registerRequestDTO.getPassword());
        user.setEmail(registerRequestDTO.getEmail());
        user.setPhone(registerRequestDTO.getPhone());
        return user;
    }
}
