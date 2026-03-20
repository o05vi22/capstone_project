package com.learnloop.learnloop.dto.response;

public class AssessmentQuestionResponse {
    private Long id;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    public AssessmentQuestionResponse() {}

    public AssessmentQuestionResponse(Long id, String question, String a, String b, String c, String d) {
        this.id = id;
        this.question = question;
        this.optionA = a;
        this.optionB = b;
        this.optionC = c;
        this.optionD = d;
    }

    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public String getOptionA() { return optionA; }
    public String getOptionB() { return optionB; }
    public String getOptionC() { return optionC; }
    public String getOptionD() { return optionD; }
}