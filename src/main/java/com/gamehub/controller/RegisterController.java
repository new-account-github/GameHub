package com.gamehub.controller;

import com.gamehub.entity.Account;
import com.gamehub.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegisterController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/register")
    public String showRegistrationForm(Account account) {
        return "/user/register";
    }

    @PostMapping("/register")
    public String registerAccount(@RequestParam("password") String password,
                                  @RequestParam("confirmPassword") String confirmPassword,
                                  Account account, Model model) {
        String username = account.getUsername();
        if (accountService.existsByUsername(username)) {
            model.addAttribute("message", "Username valid");
            return "/user/register";
        }

        if (password.equals(confirmPassword)) {
            accountService.registerAccount(account);
            return "redirect:/login";
        } else {
            model.addAttribute("error", "Wrong Password");
            return "/user/register";
        }
    }
}
