package com.learnloop.learnloop.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_message")
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false, length = 1000)
    private String content;

    private String skill;

    @Column(name = "room_id", nullable = false)
    private String roomId;

    @Column(name = "timestamp")
    private String timestamp;

    // Constructors
    public ChatMessage() {}

    public ChatMessage(String sender, String content, String skill, String roomId, String timestamp) {
        this.sender = sender;
        this.content = content;
        this.skill = skill;
        this.roomId = roomId;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}