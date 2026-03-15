package com.learnloop.learnloop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.learnloop.learnloop.dto.response.UserCardResponse;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.repository.UserRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final SkillService skillService;

    public DashboardService(UserRepository userRepository, SkillService skillService) {
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    public List<UserCardResponse> getAllUsers(Long currentUserId) {
    List<User> users = userRepository.findAll();

    return users.stream()
            .map(u -> new UserCardResponse(
                    u.getId(),
                    u.getName(),
                    u.getEmail(),
                    skillService.getUserSkills(u.getId(), "KNOW"),
                    skillService.getUserSkills(u.getId(), "NEED")
            ))
            .collect(Collectors.toList());
}
}