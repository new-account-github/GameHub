package com.gamehub.service.imp;

import com.gamehub.entity.NFT;
import com.gamehub.repository.NFTRepository;
import com.gamehub.service.NFTService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NFTServiceImp implements NFTService {

    @Autowired
    private NFTRepository nftRepository;
    @Override
    public NFT create(NFT nft) {
        return nftRepository.save(nft);
    }
}
