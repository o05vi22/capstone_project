package com.learnloop.learnloop.dto.response;

public class RequestResponse {

    private Long id;
    private Long senderId;
    private String senderName;
    private String senderEmail;
    private String skillName;
    private String status;

    public RequestResponse(Long id, Long senderId, String senderName,
                           String senderEmail, String skillName, String status) {
        this.id = id;
        this.senderId = senderId;
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.skillName = skillName;
        this.status = status;
    }

    public Long getId() { return id; }
    public Long getSenderId() { return senderId; }
    public String getSenderName() { return senderName; }
    public String getSenderEmail() { return senderEmail; }
    public String getSkillName() { return skillName; }
    public String getStatus() { return status; }
}