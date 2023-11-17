package com.gamehub.repository;

import com.gamehub.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NFTRepository extends JpaRepository<NFT, Long> {
    @Query("SELECT n FROM NFT n WHERE n.token =?1 ")
    NFT findByToken(String token_address);
}
