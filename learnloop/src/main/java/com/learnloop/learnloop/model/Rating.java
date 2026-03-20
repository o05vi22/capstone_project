package com.learnloop.learnloop.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who gives rating
    @ManyToOne(optional = false)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    // who receives rating
    @ManyToOne(optional = false)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "room_id")
    private ExchangeRoom room;

    private Integer stars; // 1..5

    @Column(length = 1000)
    private String feedback;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Rating() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getFromUser() { return fromUser; }
    public void setFromUser(User fromUser) { this.fromUser = fromUser; }

    public User getToUser() { return toUser; }
    public void setToUser(User toUser) { this.toUser = toUser; }

    public ExchangeRoom getRoom() { return room; }
    public void setRoom(ExchangeRoom room) { this.room = room; }

    public Integer getStars() { return stars; }
    public void setStars(Integer stars) { this.stars = stars; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}