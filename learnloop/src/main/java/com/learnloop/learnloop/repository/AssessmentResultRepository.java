package com.learnloop.learnloop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnloop.learnloop.model.AssessmentResult;

public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, Long> {
    List<AssessmentResult> findByUserId(Long userId);
}