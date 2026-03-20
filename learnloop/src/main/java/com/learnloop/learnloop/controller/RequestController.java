package com.learnloop.learnloop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.learnloop.learnloop.dto.response.RequestResponse;
import com.learnloop.learnloop.model.SkillRequest;
import com.learnloop.learnloop.model.User;
import com.learnloop.learnloop.repository.SkillRequestRepository;
import com.learnloop.learnloop.repository.UserRepository;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins="*")
public class RequestController {

    private final SkillRequestRepository repo;
    private final UserRepository userRepository;

<<<<<<< HEAD
    public RequestController(SkillRequestRepository repo, UserRepository userRepository){
        this.repo = repo;
        this.userRepository = userRepository;
=======
    public RequestController(SkillRequestRepository repo,UserRepository userRepository){
        this.repo = repo;
        this.userRepository=userRepository;
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
    }

    // Send Request
    @PostMapping
    public SkillRequest sendRequest(@RequestBody SkillRequest req){
        req.setStatus("PENDING");
        return repo.save(req);
    }

<<<<<<< HEAD
    // Incoming requests (receiver side)
    @GetMapping("/incoming/{userId}")
=======
    // Incoming requests (for receiver)
   @GetMapping("/incoming/{userId}")
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
    public List<RequestResponse> incoming(@PathVariable Long userId){

        List<SkillRequest> requests = repo.findByReceiverId(userId);

        return requests.stream().map(req -> {

            User sender = userRepository.findById(req.getSenderId()).orElse(null);
<<<<<<< HEAD
            User receiver = userRepository.findById(req.getReceiverId()).orElse(null);

            return new RequestResponse(
                    req.getId(),
                    sender != null ? sender.getName() : "Unknown",
                    receiver != null ? receiver.getName() : "Unknown",
=======

            return new RequestResponse(
                    req.getId(),
                    req.getSenderId(),
                    sender != null ? sender.getName() : "Unknown",
                    sender != null ? sender.getEmail() : "",
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
                    req.getSkillName(),
                    req.getStatus()
            );

        }).toList();
    }

<<<<<<< HEAD
    // Sent requests (sender side)
=======
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
    @GetMapping("/learning/sent/{userId}")
    public List<RequestResponse> sent(@PathVariable Long userId){

        List<SkillRequest> requests = repo.findBySenderId(userId);

        return requests.stream().map(req -> {

<<<<<<< HEAD
            User sender = userRepository.findById(req.getSenderId()).orElse(null);
=======
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
            User receiver = userRepository.findById(req.getReceiverId()).orElse(null);

            return new RequestResponse(
                    req.getId(),
<<<<<<< HEAD
                    sender != null ? sender.getName() : "Unknown",
                    receiver != null ? receiver.getName() : "Unknown",
=======
                    req.getReceiverId(),
                    receiver != null ? receiver.getName() : "Unknown",
                    receiver != null ? receiver.getEmail() : "",
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
                    req.getSkillName(),
                    req.getStatus()
            );

        }).toList();
    }
<<<<<<< HEAD

=======
>>>>>>> 94b9ca782b42f65255644e8ec090328b360fd354
    // Accept request
    @PutMapping("/{id}/accept")
    public SkillRequest accept(@PathVariable Long id){
        SkillRequest r = repo.findById(id).orElseThrow();
        r.setStatus("ACCEPTED");
        return repo.save(r);
    }

    // Reject request
    @PutMapping("/{id}/reject")
    public SkillRequest reject(@PathVariable Long id){
        SkillRequest r = repo.findById(id).orElseThrow();
        r.setStatus("REJECTED");
        return repo.save(r);
    }
}