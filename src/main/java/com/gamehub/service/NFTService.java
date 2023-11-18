package com.gamehub.service;

import com.gamehub.entity.NFT;

import java.util.List;

public interface NFTService {
    NFT create(NFT nft);

    NFT findByToken(String token);

    List<NFT> findByActive();

    List<NFT> getListNFT();

    void updateNFT(NFT nft);

    NFT delete(String token_address);
}
