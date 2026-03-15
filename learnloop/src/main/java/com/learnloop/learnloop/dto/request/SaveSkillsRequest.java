package com.learnloop.learnloop.dto.request;

import java.util.List;

public class SaveSkillsRequest {
    private List<String> skillsKnown;
    private List<String> skillsLearn;

    public List<String> getSkillsKnown() { return skillsKnown; }
    public void setSkillsKnown(List<String> skillsKnown) { this.skillsKnown = skillsKnown; }

    public List<String> getSkillsLearn() { return skillsLearn; }
    public void setSkillsLearn(List<String> skillsLearn) { this.skillsLearn = skillsLearn; }
}