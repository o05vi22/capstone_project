package com.learnloop.learnloop.dto.request;

import java.util.Map;

public class SubmitAssessmentRequest {
    private Long userId;
    private String skillName;

    // questionId -> chosen option ("A"/"B"/"C"/"D")
    private Map<Long, String> answers;

    public SubmitAssessmentRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}