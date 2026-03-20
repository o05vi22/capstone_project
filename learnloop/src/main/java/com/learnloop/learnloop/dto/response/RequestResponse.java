package com.learnloop.learnloop.dto.response;

public class RequestResponse {

    private Long id;
    private String senderName;
    private String receiverName;
    private String skillName;
    private String status;

    // Constructor
    public RequestResponse(Long id, String senderName, String receiverName,
                           String skillName, String status) {
        this.id = id;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.skillName = skillName;
        this.status = status;
    }

    // Getters (VERY IMPORTANT for JSON response)
    public Long getId() {
        return id;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public String getSkillName() {
        return skillName;
    }

    public String getStatus() {
        return status;
    }
}