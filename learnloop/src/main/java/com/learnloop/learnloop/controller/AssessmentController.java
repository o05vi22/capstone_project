package com.learnloop.learnloop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.dto.request.SubmitAssessmentRequest;
import com.learnloop.learnloop.dto.response.AssessmentQuestionResponse;
import com.learnloop.learnloop.dto.response.AssessmentResultResponse;
import com.learnloop.learnloop.service.AssessmentService;

@RestController
@RequestMapping("/assessment")
@CrossOrigin(origins = "*")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping("/{skillName}/questions")
    public List<AssessmentQuestionResponse> getQuestions(@PathVariable String skillName) {
        return assessmentService.getQuestions(skillName);
    }

    @PostMapping("/submit")
    public AssessmentResultResponse submit(@RequestBody SubmitAssessmentRequest req) {
        return assessmentService.submit(req);
    }
}