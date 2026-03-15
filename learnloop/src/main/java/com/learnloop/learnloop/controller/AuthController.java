package com.learnloop.learnloop.controller;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.dto.request.LoginRequest;
import com.learnloop.learnloop.dto.request.RegisterRequest;
import com.learnloop.learnloop.dto.response.AuthResponse;
import com.learnloop.learnloop.service.AuthService;

@RestController
@RequestMapping("/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}