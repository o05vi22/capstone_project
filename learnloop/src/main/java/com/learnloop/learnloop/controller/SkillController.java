package com.learnloop.learnloop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.dto.request.AssignSkillRequest;
import com.learnloop.learnloop.dto.response.UserSkillResponse;
import com.learnloop.learnloop.model.Skill;
import com.learnloop.learnloop.service.SkillService;

@RestController
@RequestMapping("/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping("/assign")
public UserSkillResponse assign(@RequestBody AssignSkillRequest req) {
    return skillService.assignSkill(req);
}
    @GetMapping("/user/{userId}")
    public List<String> getUserSkills(@PathVariable Long userId,
                                      @RequestParam(required = false) String type) {
        return skillService.getUserSkills(userId, type);
    }

    @GetMapping("/all")
    public List<Skill> allSkills() {
        return skillService.getAllSkills();
    }
}