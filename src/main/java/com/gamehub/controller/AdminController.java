package com.gamehub.controller;

import com.gamehub.entity.NFT;
import com.gamehub.service.NFTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class AdminController {
    @Autowired
    private NFTService nftService;
    @GetMapping("/admin")
    public String getAdmin(Model model) {
        List<NFT> list = new ArrayList<>();
        list = nftService.getListNFT();
        model.addAttribute("list",list);
        return "/admin/index";
    }


}
