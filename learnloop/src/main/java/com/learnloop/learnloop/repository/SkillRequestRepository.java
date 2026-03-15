package com.learnloop.learnloop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnloop.learnloop.model.SkillRequest;

public interface SkillRequestRepository extends JpaRepository<SkillRequest, Long> {

    List<SkillRequest> findByReceiverId(Long receiverId);

    List<SkillRequest> findBySenderId(Long senderId);
}