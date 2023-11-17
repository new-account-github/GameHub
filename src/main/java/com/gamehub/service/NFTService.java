package com.gamehub.service;

import com.gamehub.entity.NFT;

import java.util.List;

public interface NFTService {
    NFT create(NFT nft);
    List<NFT> getListNFT();

    NFT delete(String token_address);
}
