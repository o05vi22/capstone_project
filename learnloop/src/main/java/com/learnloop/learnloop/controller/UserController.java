package com.learnloop.learnloop.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.dto.response.UserCardResponse;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.model.UserSkill;
import com.learnloop.learnloop.repository.UserRepository;
import com.learnloop.learnloop.repository.UserSkillRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    public UserController(UserRepository userRepository,
                          UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    // ✅ Explore Users API (with skills)
    @GetMapping
    public List<UserCardResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {

            List<UserSkill> skills =
                    userSkillRepository.findByUserId(user.getId());

            List<String> knowSkills = skills.stream()
                    .filter(s -> "KNOW".equalsIgnoreCase(s.getType()))
                    .map(s -> s.getSkill().getName())
                    .collect(Collectors.toList());

            List<String> needSkills = skills.stream()
                    .filter(s -> "NEED".equalsIgnoreCase(s.getType()))
                    .map(s -> s.getSkill().getName())
                    .collect(Collectors.toList());

            return new UserCardResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    knowSkills,
                    needSkills
            );

        }).collect(Collectors.toList());
    }

    // existing endpoint
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }
}