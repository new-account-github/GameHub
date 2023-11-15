package com.gamehub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamehub.entity.NFT;
import com.gamehub.service.NFTService;

@RestController
@RequestMapping("/nft")
public class NFTController {

    @Autowired
    private NFTService nftService;

    @PostMapping("/create")
    public ResponseEntity<String> createNFT(@RequestBody NFT nft) {
        nft.setActive(true);
        nft.setRanks(0);
        nftService.create(nft);
        return ResponseEntity.ok("Save Successful");
    }
}
