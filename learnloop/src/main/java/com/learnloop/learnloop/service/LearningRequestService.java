package com.learnloop.learnloop.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.learnloop.learnloop.model.LearningRequest;
import com.learnloop.learnloop.repository.LearningRequestRepository;

@Service
public class LearningRequestService {

    private final LearningRequestRepository repo;

    public LearningRequestService(LearningRequestRepository repo) {
        this.repo = repo;
    }

    public LearningRequest send(Long senderId, Long receiverId, String skill) {
        if (senderId.equals(receiverId)) {
            throw new RuntimeException("You cannot send request to yourself");
        }

        LearningRequest request = new LearningRequest(senderId, receiverId, skill);
        return repo.save(request);
    }

    public List<LearningRequest> inbox(Long userId) {
        return repo.findByReceiverId(userId);
    }

    public List<LearningRequest> sent(Long userId) {
        return repo.findBySenderId(userId);
    }

    public LearningRequest accept(Long requestId) {
        LearningRequest req = repo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("ACCEPTED");
        return repo.save(req);
    }

    public LearningRequest reject(Long requestId) {
        LearningRequest req = repo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("REJECTED");
        return repo.save(req);
    }
}