package com.learnloop.learnloop.controller;

import com.learnloop.learnloop.model.ChatMessage;
import com.learnloop.learnloop.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatRestController {

    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/{roomId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String roomId) {
        try {
            List<ChatMessage> messages = chatRepository.findByRoomIdOrderByIdAsc(roomId);
            System.out.println("Fetching messages for room: " + roomId + ", count: " + messages.size());
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.err.println("Error fetching messages: " + e.getMessage());
            return ResponseEntity.ok(List.of()); // Return empty list on error
        }
    }

    // Optional: Add a test endpoint to verify the controller is working
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Chat controller is working");
    }

    @GetMapping("/debug/{roomId}")
    public ResponseEntity<?> debugRoom(@PathVariable String roomId) {
        try {
            List<ChatMessage> messages = chatRepository.findByRoomIdOrderByIdAsc(roomId);
            long count = chatRepository.count();

            return ResponseEntity.ok(new java.util.HashMap<String, Object>() {
                {
                    put("roomId", roomId);
                    put("messageCount", messages.size());
                    put("totalMessagesInDB", count);
                    put("messages", messages);
                }
            });
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}