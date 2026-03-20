package com.learnloop.learnloop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.learnloop.learnloop.dto.request.AssignSkillRequest;
import com.learnloop.learnloop.dto.response.UserSkillResponse;
import com.learnloop.learnloop.model.Skill;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.model.UserSkill;
import com.learnloop.learnloop.repository.SkillRepository;
import com.learnloop.learnloop.repository.UserRepository;
import com.learnloop.learnloop.repository.UserSkillRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    public SkillService(SkillRepository skillRepository,
                        UserRepository userRepository,
                        UserSkillRepository userSkillRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    // ✅ For dropdown/list usage if needed
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // ✅ Assign KNOW/NEED skill with level (typed input support)
    public UserSkillResponse assignSkill(AssignSkillRequest req) {

        // ---- Validation ----
        if (req.getUserId() == null) {
            throw new RuntimeException("userId is required");
        }
        if (req.getSkillName() == null || req.getSkillName().trim().isEmpty()) {
            throw new RuntimeException("skillName is required");
        }
        if (req.getType() == null || req.getType().trim().isEmpty()) {
            throw new RuntimeException("type is required (KNOW/NEED)");
        }

        String type = req.getType().trim().toUpperCase();
        if (!type.equals("KNOW") && !type.equals("NEED")) {
            throw new RuntimeException("type must be KNOW or NEED");
        }

        String level = (req.getLevel() == null) ? null : req.getLevel().trim().toUpperCase();

        // level required only for KNOW
        if (type.equals("KNOW")) {
            if (level == null || level.isEmpty()) {
                throw new RuntimeException("level is required for KNOW (BEGINNER/MODERATE/ADVANCED)");
            }
            if (!level.equals("BEGINNER") && !level.equals("MODERATE") && !level.equals("ADVANCED")) {
                throw new RuntimeException("level must be BEGINNER, MODERATE, or ADVANCED");
            }
        } else {
            // NEED: level optional; if provided, validate it
            if (level != null && !level.isEmpty()) {
                if (!level.equals("BEGINNER") && !level.equals("MODERATE") && !level.equals("ADVANCED")) {
                    throw new RuntimeException("level must be BEGINNER, MODERATE, or ADVANCED");
                }
            }
        }

        // ---- Load user ----
        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + req.getUserId()));

        // ---- Get or Create skill (typed input) ----
        String skillName = req.getSkillName().trim();

        

Skill skill = skillRepository.findByName(skillName)
        .orElseGet(() -> skillRepository.save(new Skill(skillName)));
        // ---- Prevent duplicates ----
        if (userSkillRepository.existsByUserIdAndSkillIdAndType(user.getId(), skill.getId(), type)) {
            throw new RuntimeException("Skill already assigned for this type");
        }

        // ---- Save UserSkill ----
        UserSkill us = new UserSkill();
        us.setUser(user);
        us.setSkill(skill);
        us.setType(type);
        us.setLevel(level);

        UserSkill saved = userSkillRepository.save(us);

        // ---- Return safe response ----
        return new UserSkillResponse(
                saved.getId(),
                saved.getType(),
                user.getId(),
                skill.getId(),
                skill.getName()
        );
    }

    // ✅ Return list of skills for a user (names only)
    public List<String> getUserSkills(Long userId, String type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        String t = (type == null) ? "" : type.toUpperCase().trim();

        return userSkillRepository.findByUser(user).stream()
                .filter(us -> t.isBlank() || us.getType().equalsIgnoreCase(t))
                .map(us -> us.getSkill().getName())
                .distinct()
                .collect(Collectors.toList());
    }

    // ✅ Return list with skill name + level (for showing levels in UI)
    public List<UserSkillResponse> getUserSkillsWithLevels(Long userId, String type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        String t = (type == null) ? "" : type.toUpperCase().trim();

        return userSkillRepository.findByUser(user).stream()
                .filter(us -> t.isBlank() || us.getType().equalsIgnoreCase(t))
                .map(us -> new UserSkillResponse(
                        us.getId(),
                        us.getType(),
                        user.getId(),
                        us.getSkill().getId(),
                        us.getSkill().getName()
                ))
                .collect(Collectors.toList());
    }
}