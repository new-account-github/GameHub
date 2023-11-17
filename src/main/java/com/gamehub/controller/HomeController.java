package com.gamehub.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	@Autowired
	private HttpServletRequest request;

	@GetMapping("/home")
	public String index(Model model) {
		return "user/index";
	}
}
