package com.password.manager.core.security;


import com.password.manager.core.db.entities.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("security")
@RequiredArgsConstructor
public class SecurityService {
    private final PasswordEncoder encoder;
    private final FolderRepository folderRepository;
    private final PasswordRepository passwordRepository;

    public boolean isValidMasterPassword(AuthPrincipal authPrincipal, String masterPassword) {
        return encoder.matches(masterPassword, authPrincipal.getPassword());
    }

    public boolean isFolderOwner(AuthPrincipal authPrincipal, String idFolder) {
        return folderRepository.findById(UUID.fromString(idFolder))
                .filter(folder -> folder.getAccountEntity().getId().equals(authPrincipal.getAccountEntity().getId()))
                .isPresent();
    }

    public boolean isPasswordOwner(AuthPrincipal authPrincipal, String passId) {
        return passwordRepository
                .findById(UUID.fromString(passId))
                .map(PasswordEntity::getFolderEntity)
                .map(FolderEntity::getAccountEntity)
                .map(AccountEntity::getId)
                .filter(idOwner -> idOwner.equals(authPrincipal.getAccountEntity().getId()))
                .isPresent();
    }
}
