package com.gamehub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WalletController {
	
	@GetMapping("/wallet")
	public String index(Model model) {
		
		return "user/WalletInfo";
	}
}
