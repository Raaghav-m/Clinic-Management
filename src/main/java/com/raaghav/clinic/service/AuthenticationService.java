package com.raaghav.clinic.service;

import com.raaghav.clinic.dto.AuthenticationResponseDTO;
import com.raaghav.clinic.dto.LoginRequestDTO;
import com.raaghav.clinic.dto.RegisterRequestDTO;
import com.raaghav.clinic.entity.Role;
import com.raaghav.clinic.entity.User;
import com.raaghav.clinic.exception.ResourceNotFoundException;
import com.raaghav.clinic.mapper.AuthenticationMapper;
import com.raaghav.clinic.repository.UserRepository;
import com.raaghav.clinic.security.JwtService;
import io.jsonwebtoken.Jwt;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthenticationService(JwtService jwtService,AuthenticationManager authenticationManager,UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }
    public AuthenticationResponseDTO register(RegisterRequestDTO registerRequestDTO){
        User user = AuthenticationMapper.toEntity(registerRequestDTO);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.PATIENT);

        userRepository.save(user);
        String token=jwtService.generateToken(user);
        return AuthenticationMapper.toResponse(token);
    }
    public AuthenticationResponseDTO authenticate(LoginRequestDTO loginRequestDTO){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getEmail(),
                            loginRequestDTO.getPassword()
                    )
            );
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        User user=userRepository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(()->new ResourceNotFoundException("The given email id is not found"));
        String token=jwtService.generateToken(user);
        return AuthenticationMapper.toResponse(token);

    }

}
