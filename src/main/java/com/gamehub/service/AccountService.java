package com.gamehub.service;

import com.gamehub.entity.Account;

import java.util.NoSuchElementException;
import java.util.Optional;

public interface AccountService {
    Optional<Account> findByUsername(String username) throws NoSuchElementException;

    Account create(Account account);

    String getFullNameByUserName(String username);
}
