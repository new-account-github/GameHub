package com.gamehub.repository;

import com.gamehub.entity.Game;
import com.gamehub.entity.Wallet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game,Long> {

}
