package com.learnloop.learnloop.dto.response;

import java.util.List;

public class UserCardResponse {
    private Long id;
    private String name;
    private String email;
    private List<String> knowSkills;
    private List<String> needSkills;

    public UserCardResponse() {}

    public UserCardResponse(Long id, String name, String email, List<String> knowSkills, List<String> needSkills) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.knowSkills = knowSkills;
        this.needSkills = needSkills;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public List<String> getKnowSkills() { return knowSkills; }
    public List<String> getNeedSkills() { return needSkills; }
}