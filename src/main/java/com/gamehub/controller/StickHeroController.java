package com.gamehub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class StickHeroController {
	
	@Autowired
	private HttpServletRequest request;
	@GetMapping("/stickhero")
	public String flappyBird(Model model) {
		String username = request.getRemoteUser();
		if (username != null && (request.isUserInRole("ADMIN")|| request.isUserInRole("STAFF"))){
			model.addAttribute("isAuthenticated",true);
			model.addAttribute("isAdmin",true);
		} else if(username != null){
			model.addAttribute("isAuthenticated",true);
		} else {
			model.addAttribute("isAuthenticated",false);
			model.addAttribute("isAdmin",false);
		}
		return "user/stickhero";
	}
}
