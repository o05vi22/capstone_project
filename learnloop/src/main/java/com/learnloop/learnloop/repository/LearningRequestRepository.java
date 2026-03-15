package com.learnloop.learnloop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnloop.learnloop.model.LearningRequest;

public interface LearningRequestRepository extends JpaRepository<LearningRequest, Long> {

    List<LearningRequest> findByReceiverId(Long receiverId);

    List<LearningRequest> findBySenderId(Long senderId);
}