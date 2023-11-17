package com.gamehub.rest;

import com.gamehub.entity.NFT;
import com.gamehub.service.NFTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/nft")
public class NFTRestController {
    @Autowired
    private NFTService nftService;

    @PostMapping("/create")
    public ResponseEntity<String> createNFT(@RequestBody NFT nft) {
        nft.setActive(true);
        nftService.create(nft);
        return ResponseEntity.ok("Save Successful");
    }

    @DeleteMapping("/delete/{token}")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> requestBody) {
        String tokenAddress = requestBody.get("token");
        System.out.println(tokenAddress);
        nftService.delete(tokenAddress);
        return ResponseEntity.ok("Delete Successful");
    }
}
