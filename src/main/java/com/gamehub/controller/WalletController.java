package com.gamehub.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gamehub.entity.NFT;
import com.gamehub.service.NFTService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class WalletController {
	
	@Autowired
    private NFTService nftService;

	@GetMapping("/wallet")
	public String index(Model model) {
		
		return "user/WalletInfo";
	}
	@GetMapping("/randomnft")
	public void randomNft(Model model, HttpServletResponse response) {
		List<NFT> list = nftService.findByActive();
		// Sử dụng đối tượng Random để chọn ngẫu nhiên các sản phẩm
        Random random = new Random();
		int randomNumber = random.nextInt(list.size());
		String nftAddress=list.get(randomNumber).getToken();
		// Tạo một đối tượng Cookie
        Cookie myCookie = new Cookie("adresstoken", nftAddress);
		System.out.println(list.get(randomNumber).getToken());
        // Đặt thời gian sống của Cookie (ví dụ: 1 giờ)
        myCookie.setMaxAge(60 * 60);
		response.addCookie(myCookie);
	}

	@GetMapping("/setactivenft")
    public void handleAjaxRequest(@RequestParam String token) {
        NFT nft = nftService.findByToken(token);
		
        System.out.println("Received nft: " + nft.getId());
		nft.setActive(false);
		nftService.updateNFT(nft);
        // Xử lý dữ liệu ở đây
        System.out.println("Received data: " + token);
    }

}
