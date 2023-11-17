package com.gamehub.repository;

import com.gamehub.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByUsername(String username);

    @Query("SELECT a.fullname FROM Account a WHERE a.username =?1")
    String getFullNameByUserName(String username);
}
