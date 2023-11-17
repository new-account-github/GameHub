package com.gamehub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class StickHeroController {
	@GetMapping("/stickhero")
	public String flappyBird(Model model) {
		return "user/stickhero";
	}
}
