package com.learnloop.learnloop.dto.request;

public class AssignSkillRequest {
    private Long userId;
    private String skillName;
    private String type;  // KNOW or NEED
    private String level; // BEGINNER / MODERATE / ADVANCED

    public AssignSkillRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
}