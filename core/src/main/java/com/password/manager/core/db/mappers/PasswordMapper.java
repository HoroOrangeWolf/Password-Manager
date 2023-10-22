package com.password.manager.core.db.mappers;


import com.password.manager.core.db.entities.PasswordEntity;
import com.password.manager.core.db.models.PasswordDTO;
import org.springframework.stereotype.Component;

@Component
public class PasswordMapper {
    public PasswordDTO mapEntityToDto(PasswordEntity entity) {
        return new PasswordDTO(
                entity.getId(),
                entity.getName(),
                entity.getLogin(),
                entity.getPassword(),
                entity.getPageUrl(),
                entity.getModifiedDate(),
                entity.getCreatedDate()
        );
    }
}
