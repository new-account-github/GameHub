package com.gamehub.repository;

import com.gamehub.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface GameRepository extends JpaRepository<Game,Long> {
}
