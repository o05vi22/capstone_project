package com.learnloop.learnloop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.model.UserSkill;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUser(User user);
    boolean existsByUserIdAndSkillIdAndType(Long userId, Long skillId, String type);
}