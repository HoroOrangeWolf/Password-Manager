package com.password.manager.core.db.mappers;

import com.password.manager.core.db.entities.AccountEntity;
import com.password.manager.core.db.models.AccountDTO;
import com.password.manager.core.rest.models.RegisterRequest;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    public AccountEntity mapRegisterRequestToEntity(RegisterRequest registerRequest) {
        return AccountEntity.builder()
                .username(registerRequest.username())
                .isActivated(true)
                .email(registerRequest.email())
                .password(registerRequest.password())
                .build();
    }
}
