package com.raaghav.clinic.controller;

import com.raaghav.clinic.dto.AuthenticationResponseDTO;
import com.raaghav.clinic.dto.LoginRequestDTO;
import com.raaghav.clinic.dto.RegisterRequestDTO;
import com.raaghav.clinic.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    public AuthenticationController(AuthenticationService authenticationService){
        this.authenticationService=authenticationService;
    }
    @PostMapping("/register")
    public AuthenticationResponseDTO register(
            @Valid @RequestBody RegisterRequestDTO registerRequestDTO) {

        return authenticationService.register(registerRequestDTO);
    }
    @PostMapping("/login")
    public AuthenticationResponseDTO login(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        System.out.println("hello there");
        return authenticationService.authenticate(loginRequestDTO);
    }

    @GetMapping("/test")
    public String test() {
        return "Authenticated!";
    }
}
