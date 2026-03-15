package com.learnloop.learnloop.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.learnloop.learnloop.dto.request.SubmitAssessmentRequest;
import com.learnloop.learnloop.dto.response.AssessmentQuestionResponse;
import com.learnloop.learnloop.dto.response.AssessmentResultResponse;
import com.learnloop.learnloop.model.AssessmentQuestion;
import com.learnloop.learnloop.model.AssessmentResult;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.repository.AssessmentQuestionRepository;
import com.learnloop.learnloop.repository.AssessmentResultRepository;
import com.learnloop.learnloop.repository.UserRepository;

@Service
public class AssessmentService {

    private final AssessmentQuestionRepository questionRepo;
    private final AssessmentResultRepository resultRepo;
    private final UserRepository userRepo;

    public AssessmentService(AssessmentQuestionRepository questionRepo,
                             AssessmentResultRepository resultRepo,
                             UserRepository userRepo) {
        this.questionRepo = questionRepo;
        this.resultRepo = resultRepo;
        this.userRepo = userRepo;
    }

    // ✅ Map many skills into 4 categories so you don't create questions for every single skill
    private String mapSkillToCategory(String skillName) {
        if (skillName == null) return "PROGRAMMING";

        String s = skillName.trim().toLowerCase();

        // Programming languages
        if (s.equals("java") || s.equals("python") || s.equals("c++") || s.equals("c") || s.equals("cpp")) {
            return "PROGRAMMING";
        }

        // Backend frameworks/runtime
        if (s.contains("spring") || s.contains("node")) { // springboot, spring boot, node.js
            return "BACKEND";
        }

        // Databases
        if (s.contains("mysql") || s.contains("mongo")) { // mongodb
            return "DATABASE";
        }

        // Git tools
        if (s.contains("git")) { // git, github
            return "GIT";
        }

        // Default fallback
        return "PROGRAMMING";
    }

   public List<AssessmentQuestionResponse> getQuestions(String skillName) {

    String category = mapSkillToCategory(skillName);

    List<AssessmentQuestion> questions =
            questionRepo.findBySkillNameIgnoreCase(category);

    if (questions.isEmpty()) {
        throw new RuntimeException("No questions found for category: " + category);
    }

    // 🔥 Shuffle questions randomly
    java.util.Collections.shuffle(questions);

    // 🔥 Select only 10
    int limit = Math.min(10, questions.size());
    List<AssessmentQuestion> selected = questions.subList(0, limit);

    return selected.stream()
            .map(q -> new AssessmentQuestionResponse(
                    q.getId(),
                    q.getQuestion(),
                    q.getOptionA(),
                    q.getOptionB(),
                    q.getOptionC(),
                    q.getOptionD()
            ))
            .collect(java.util.stream.Collectors.toList());
}

    // ✅ Submit answers, calculate score, grant badge if >= 50%
    public AssessmentResultResponse submit(SubmitAssessmentRequest req) {

        if (req.getUserId() == null || req.getSkillName() == null || req.getAnswers() == null) {
            throw new RuntimeException("userId, skillName, answers are required");
        }

        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + req.getUserId()));

        String category = mapSkillToCategory(req.getSkillName());

        List<AssessmentQuestion> questions = questionRepo.findBySkillNameIgnoreCase(category);
        if (questions.isEmpty()) {
            throw new RuntimeException("No questions found for category: " + category);
        }

        Map<Long, String> answers = req.getAnswers();

int total = answers.size();
int correct = 0;

for (Map.Entry<Long, String> entry : answers.entrySet()) {

    Long questionId = entry.getKey();
    String chosen = entry.getValue();

    AssessmentQuestion q = questionRepo.findById(questionId)
            .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));

    if (chosen != null && chosen.trim().equalsIgnoreCase(q.getCorrectOption())) {
        correct++;
    }
}

        double percent = (total == 0) ? 0.0 : (correct * 100.0) / total;
        boolean passed = percent >= 50.0;

        // ✅ Save assessment result (store category)
        AssessmentResult saved = resultRepo.save(
                new AssessmentResult(user.getId(), category, total, correct, percent, passed)
        );

        boolean badgeGranted = false;

        // ✅ Grant badge if passed
        if (passed) {
            user.setBadge(true);
            userRepo.save(user);
            badgeGranted = true;
        }

        return new AssessmentResultResponse(
                saved.getScorePercent(),
                correct,
                total,
                passed,
                badgeGranted
        );
    }
}