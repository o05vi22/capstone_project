package com.learnloop.learnloop.dto.response;

public class RequestResponse {

    private Long id;
<<<<<<< HEAD
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
=======
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
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
        this.skillName = skillName;
        this.status = status;
    }

<<<<<<< HEAD
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
=======
    public Long getId() { return id; }
    public Long getSenderId() { return senderId; }
    public String getSenderName() { return senderName; }
    public String getSenderEmail() { return senderEmail; }
    public String getSkillName() { return skillName; }
    public String getStatus() { return status; }
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
}