package com.password.manager.core.service;

import com.password.manager.core.db.encrypt.AESEncryptionService;
import com.password.manager.core.db.entities.*;
import com.password.manager.core.db.mappers.AccountMapper;
import com.password.manager.core.db.mappers.FolderMapper;
import com.password.manager.core.db.mappers.PasswordMapper;
import com.password.manager.core.db.models.FolderDTO;
import com.password.manager.core.db.models.PasswordDTO;
import com.password.manager.core.rest.models.FolderRequest;
import com.password.manager.core.rest.models.PasswordRequest;
import com.password.manager.core.rest.models.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserFacade {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final FolderRepository folderRepository;
    private final AccountMapper userMapper;
    private final PasswordRepository passwordRepository;
    private final FolderMapper folderMapper;
    private final PasswordMapper passwordMapper;
    private final AESEncryptionService aesEncryptionService;

    @Transactional
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

    @Transactional
    public FolderDTO addFolder(AccountEntity accountEntity, FolderRequest request) {
        int DEFAULT_ORDER = 0;

        FolderEntity folderEntity = FolderEntity.builder()
                .folderOrder(DEFAULT_ORDER)
                .accountEntity(accountEntity)
                .name(request.name())
                .passwordEntities(Collections.emptyList())
                .build();

        FolderEntity saved = folderRepository.save(folderEntity);

        return folderMapper.mapEntityToDto(saved);
    }

    @Transactional
    public void removeFolder(String folderId) {
        folderRepository.deleteById(UUID.fromString(folderId));
    }

    @Transactional
    public void deletePassword(String passwordId) {
        passwordRepository.deleteById(UUID.fromString(passwordId));
    }

    @Transactional
    public PasswordDTO addPassword(PasswordRequest passwordRequest, String folderId) {
        FolderEntity folderEntity = folderRepository.findById(UUID.fromString(folderId))
                .orElseThrow(() -> new IllegalStateException("Folder not found!"));

        UUID id = folderEntity.getAccountEntity().getId();

        String encryptedPassword = aesEncryptionService.encrypt(id, passwordRequest.password(), passwordRequest.masterKey());
        String encryptedLogin = aesEncryptionService.encrypt(id, passwordRequest.login(), passwordRequest.masterKey());

        PasswordEntity passwordEntity = PasswordEntity.builder()
                .login(encryptedLogin)
                .password(encryptedPassword)
                .name(passwordRequest.name())
                .pageUrl(passwordRequest.pageUrl())
                .folderEntity(folderEntity)
                .build();

        PasswordEntity save = passwordRepository.save(passwordEntity);

        return passwordMapper.mapEntityToDto(save)
                .toBuilder()
                .login(passwordRequest.login())
                .password(passwordRequest.password())
                .build();
    }

    @Transactional(readOnly = true)
    public List<FolderDTO> getUncodedFolderWithPasswords(AccountEntity accountEntity, String masterKey) {
        return folderRepository.findAllByAccountId(accountEntity.getId())
                .stream()
                .map(folderMapper::mapEntityToDto)
                .map(folderDTO -> folderDTO
                        .toBuilder()
                        .passwordEntries(uncodePasswords(folderDTO.passwordEntries(), masterKey, accountEntity.getId()))
                        .build())
                .toList();
    }

    private List<PasswordDTO> uncodePasswords(List<PasswordDTO> passwordDTOS, String masterKey, UUID accountId) {
        return passwordDTOS
                .stream()
                .map(dto -> dto
                        .toBuilder()
                        .password(aesEncryptionService.decrypt(accountId, dto.password(), masterKey))
                        .login(aesEncryptionService.decrypt(accountId, dto.login(), masterKey))
                        .build()
                )
                .toList();
    }
}
