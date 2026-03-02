package com.learnloop.learnloop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/users")
    public List<com.learnloop.learnloop.dto.response.UserCardResponse> users(@RequestParam(required = false) Long currentUserId) {
        return dashboardService.getAllUsers(currentUserId);
    }
}