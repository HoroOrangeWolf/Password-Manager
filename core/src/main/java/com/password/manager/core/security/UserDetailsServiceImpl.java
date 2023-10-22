package com.password.manager.core.security;

import com.password.manager.core.db.entities.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository
                .findByEmail(username)
                .map(entity -> new AuthPrincipal(
                                entity.getEmail(),
                                entity.getUsername(),
                                entity.getPassword(),
                                entity.isActivated(),
                                entity
                        )
                )
                .orElseThrow(() -> new UsernameNotFoundException("User by email " + username + " not found!"));
    }
}
