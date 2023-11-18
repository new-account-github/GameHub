package com.gamehub.service.imp;

import com.gamehub.entity.Account;
import com.gamehub.repository.AccountRepository;
import com.gamehub.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AccountServiceImp implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Optional<Account> findByUsername(String username) throws NoSuchElementException {
        return accountRepository.findByUsername(username);
    }
    @Override
    public Account create(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }

    @Override
    public String getFullNameByUserName(String username) {
        return accountRepository.getFullNameByUserName(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }
    @Override
    public Account registerAccount(Account account) {
        account.setUsername(account.getUsername());
        account.setFullname(account.getFullname());
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }
}
