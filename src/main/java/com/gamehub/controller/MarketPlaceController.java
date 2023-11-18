package com.gamehub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MarketPlaceController {

    @RequestMapping("/market")
    public String market(){
        return "/user/market";
    }
}
