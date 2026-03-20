package com.learnloop.learnloop.dto.response;

public class AssessmentResultResponse {
    private double scorePercent;
    private int correctAnswers;
    private int totalQuestions;
    private boolean passed;
    private boolean badgeGranted;

    public AssessmentResultResponse() {}

    public AssessmentResultResponse(double scorePercent, int correctAnswers, int totalQuestions,
                                    boolean passed, boolean badgeGranted) {
        this.scorePercent = scorePercent;
        this.correctAnswers = correctAnswers;
        this.totalQuestions = totalQuestions;
        this.passed = passed;
        this.badgeGranted = badgeGranted;
    }

    public double getScorePercent() { return scorePercent; }
    public int getCorrectAnswers() { return correctAnswers; }
    public int getTotalQuestions() { return totalQuestions; }
    public boolean isPassed() { return passed; }
    public boolean isBadgeGranted() { return badgeGranted; }
}