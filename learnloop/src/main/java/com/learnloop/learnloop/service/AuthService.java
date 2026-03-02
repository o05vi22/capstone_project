package com.learnloop.learnloop.service;

import org.springframework.stereotype.Service;

import com.learnloop.learnloop.dto.request.LoginRequest;
import com.learnloop.learnloop.dto.request.RegisterRequest;
import com.learnloop.learnloop.dto.response.AuthResponse;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(req.getPassword()); // (Later we will hash this)
        u.setRole("USER");

        User saved = userRepository.save(u);

        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), "Registered successfully");
    }

    public AuthResponse login(LoginRequest req) {
        User u = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!u.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(u.getId(), u.getName(), u.getEmail(), u.getRole(), "Login success");
    }
}