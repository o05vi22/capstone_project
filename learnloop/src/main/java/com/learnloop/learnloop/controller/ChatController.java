package com.learnloop.learnloop.controller;

import com.learnloop.learnloop.model.ChatMessage;
import com.learnloop.learnloop.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{roomId}")
    public void send(
            @DestinationVariable String roomId,
            @Payload ChatMessage message) {

        try {
            // Log received message
            System.out.println("📥 BACKEND RECEIVED: " + message.getContent());
            System.out.println("   From: " + message.getSender());
            System.out.println("   Room: " + roomId);
            
            // Ensure roomId is set
            message.setRoomId(roomId);
            
            // Save to database
            ChatMessage savedMessage = chatRepository.save(message);
            System.out.println("✅ Saved to database with ID: " + savedMessage.getId());

            // Broadcast to ALL subscribers of this room (including sender)
            messagingTemplate.convertAndSend("/topic/chat/" + roomId, savedMessage);
            System.out.println("📢 Broadcasted to /topic/chat/" + roomId);
            
        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}