package com.password.manager.core.db.mappers;


import com.password.manager.core.db.entities.FolderEntity;
import com.password.manager.core.db.models.FolderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FolderMapper {
    private final PasswordMapper passwordMapper;

    public FolderDTO mapEntityToDto(FolderEntity folderEntity) {
        return new FolderDTO(
                folderEntity.getId(),
                folderEntity.getName(),
                folderEntity.getFolderOrder(),
                folderEntity.getPasswordEntities()
                        .stream()
                        .map(passwordMapper::mapEntityToDto)
                        .toList()
        );
    }
}
