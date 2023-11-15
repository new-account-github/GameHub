package com.gamehub.rest;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConnectRestController {
    @GetMapping("https://api.shyft.to/sol/v1/wallet/balance?network=devnet&wallet=J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ")
    public ResponseEntity<?> getBalence(){
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Success");
    }
}
