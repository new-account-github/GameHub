package com.gamehub.service.imp;

import com.gamehub.entity.NFT;
import com.gamehub.repository.NFTRepository;
import com.gamehub.service.NFTService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NFTServiceImp implements NFTService {
    @Autowired
    private NFTRepository nftRepository;
    @Override
    public NFT create(NFT nft) {
        return nftRepository.save(nft);
    }
    @Override
    public NFT findByToken(String token) {
        return nftRepository.findByToken(token);
    }

    @Override
    public List<NFT> findByActive() {
        return nftRepository.findByActive();
    }

    @Override
    public List<NFT> getListNFT() {
        return nftRepository.findAll();
    }


    @Override
    public NFT delete(String token_address) {
        NFT nft = nftRepository.findByToken(token_address);
        System.out.println(nft);
        if (nft != null){
            nftRepository.deleteById(nft.getId());
        }
        return nft;
    }

    @Override
    public void updateNFT(NFT nft) {
        nftRepository.save(nft);
    }
}
