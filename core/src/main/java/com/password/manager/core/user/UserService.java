package com.password.manager.core.user;

import com.password.manager.core.db.entities.AccountEntity;
import com.password.manager.core.db.entities.AccountRepository;
import com.password.manager.core.db.mappers.AccountMapper;
import com.password.manager.core.rest.models.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper userMapper;

    public void registerUser(RegisterRequest registerRequest) {
        Optional<AccountEntity> byEmail = accountRepository.findByEmail(registerRequest.email());

        if (byEmail.isPresent()) {
            throw new IllegalStateException("User by email " + byEmail.get().getEmail() + " already exists");
        }

        String encode = passwordEncoder.encode(registerRequest.password());

        RegisterRequest withEncodedPassword = registerRequest.toBuilder()
                .password(encode)
                .build();

        AccountEntity accountEntity = userMapper.mapRegisterRequestToEntity(withEncodedPassword);

        accountRepository.save(accountEntity);
    }
}
