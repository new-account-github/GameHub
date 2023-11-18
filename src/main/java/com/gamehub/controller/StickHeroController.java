package com.gamehub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class StickHeroController {
	@GetMapping("/stickhero")
	public String flappyBird(Model model) {
		return "user/stickhero";
	}
}
