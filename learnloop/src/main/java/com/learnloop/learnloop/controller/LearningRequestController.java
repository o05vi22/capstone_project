package com.learnloop.learnloop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.model.LearningRequest;
import com.learnloop.learnloop.service.LearningRequestService;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "*")
public class LearningRequestController {

    private final LearningRequestService service;

    public LearningRequestController(LearningRequestService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public LearningRequest send(@RequestBody SendRequest req) {
        return service.send(req.senderId, req.receiverId, req.skill);
    }

    @GetMapping("/inbox/{userId}")
    public List<LearningRequest> inbox(@PathVariable Long userId) {
        return service.inbox(userId);
    }

    @GetMapping("/sent/{userId}")
    public List<LearningRequest> sent(@PathVariable Long userId) {
        return service.sent(userId);
    }

    @PostMapping("/{id}/accept")
    public LearningRequest accept(@PathVariable Long id) {
        return service.accept(id);
    }

    @PostMapping("/{id}/reject")
    public LearningRequest reject(@PathVariable Long id) {
        return service.reject(id);
    }

    // Inner DTO class
    static class SendRequest {
        public Long senderId;
        public Long receiverId;
        public String skill;
    }
}