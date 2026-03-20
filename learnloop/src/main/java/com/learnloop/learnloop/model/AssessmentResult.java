package com.learnloop.learnloop.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "assessment_results")
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String skillName;

    private int totalQuestions;
    private int correctAnswers;

    private double scorePercent; // ex: 70.0
    private boolean passed;

    private LocalDateTime createdAt = LocalDateTime.now();

    public AssessmentResult() {}

    public AssessmentResult(Long userId, String skillName, int totalQuestions, int correctAnswers,
                            double scorePercent, boolean passed) {
        this.userId = userId;
        this.skillName = skillName;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.scorePercent = scorePercent;
        this.passed = passed;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getSkillName() { return skillName; }
    public int getTotalQuestions() { return totalQuestions; }
    public int getCorrectAnswers() { return correctAnswers; }
    public double getScorePercent() { return scorePercent; }
    public boolean isPassed() { return passed; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }
    public void setScorePercent(double scorePercent) { this.scorePercent = scorePercent; }
    public void setPassed(boolean passed) { this.passed = passed; }
}