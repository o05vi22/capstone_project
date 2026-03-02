package com.learnloop.learnloop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnloop.learnloop.model.AssessmentQuestion;

public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Long> {
    List<AssessmentQuestion> findBySkillNameIgnoreCase(String skillName);
}