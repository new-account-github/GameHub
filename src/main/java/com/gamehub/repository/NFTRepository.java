package com.gamehub.repository;

import com.gamehub.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NFTRepository extends JpaRepository<NFT,Long> {

}
