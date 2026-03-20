package com.learnloop.learnloop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.learnloop.learnloop.model.ExchangeRoom;

public interface ExchangeRoomRepository extends JpaRepository<ExchangeRoom, Long> {
    List<ExchangeRoom> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);
}