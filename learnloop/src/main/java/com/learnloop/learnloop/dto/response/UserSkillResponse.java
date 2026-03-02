package com.learnloop.learnloop.dto.response;

public class UserSkillResponse {
    private Long id;
    private String type;
    private Long userId;
    private Long skillId;
    private String skillName;

    public UserSkillResponse() {}

    public UserSkillResponse(Long id, String type, Long userId, Long skillId, String skillName) {
        this.id = id;
        this.type = type;
        this.userId = userId;
        this.skillId = skillId;
        this.skillName = skillName;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public Long getUserId() { return userId; }
    public Long getSkillId() { return skillId; }
    public String getSkillName() { return skillName; }
    private boolean badge;

public boolean isBadge() { return badge; }
public void setBadge(boolean badge) { this.badge = badge; }
}