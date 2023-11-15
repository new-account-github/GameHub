package com.gamehub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
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

    private String fullname;

//    private Double exp;

    @OneToMany(mappedBy = "account" ,fetch = FetchType.EAGER)
    private List<Authority> authorities;

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
