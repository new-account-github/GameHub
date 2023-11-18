package com.gamehub.repository;

import com.gamehub.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NFTRepository extends JpaRepository<NFT, Long> {
    @Query("SELECT n FROM NFT n WHERE n.token =?1 ")
    NFT findByToken(String token_address);

    @Query("SELECT n FROM NFT n WHERE n.active = 1")
    List<NFT> findByActive();

    @Modifying
    @Transactional
    @Query("UPDATE NFT n SET n.active = :newActiveValue WHERE n.id = :nftId")
    void updateNFTActiveStatus(@Param("nftId") Long nftId, @Param("newActiveValue") Boolean newActiveValue);

}
