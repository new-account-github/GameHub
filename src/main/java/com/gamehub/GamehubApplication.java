package com.gamehub;

import com.gamehub.entity.Account;
import com.gamehub.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GamehubApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamehubApplication.class, args);
	}

	// @Bean
	// CommandLineRunner run(AccountService accountService){
	// 	return args ->{
	// 		accountService.create(new Account("cuong","123"));
	// 		accountService.create(new Account("dung","123"));
	// 	};
	// };
}
