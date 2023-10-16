package com.gamehub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String avatar;

    private String firstname;

    private String lastname;

    private String fullname;

    private String phone;

    private Double exp;

    @OneToMany(mappedBy = "account")
   private List<Wallet> wallet;
}
