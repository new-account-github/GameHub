package com.gamehub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MarketPlaceController {
	
	@GetMapping("market/marketplace")
	public String marketplace(Model model) {
		
		return "user/marketplace";
	}
	@GetMapping("market/mylistings")
	public String myListings(Model model) {
		
		return "user/mylistings";
	}
}
