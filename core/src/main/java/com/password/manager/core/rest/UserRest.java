package com.password.manager.core.rest;

import com.password.manager.core.db.models.AccountDTO;
import com.password.manager.core.db.models.FolderDTO;
import com.password.manager.core.db.models.PasswordDTO;
import com.password.manager.core.rest.models.FolderRequest;
import com.password.manager.core.rest.models.MessageModel;
import com.password.manager.core.rest.models.PasswordRequest;
import com.password.manager.core.security.AuthPrincipal;
import com.password.manager.core.service.UserFacade;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserRest {

    private final UserFacade userFacade;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AccountDTO> getCurrentUser(@AuthenticationPrincipal AuthPrincipal authPrincipal, HttpServletRequest httpRequest) {
        String rememberMe = Arrays.stream(httpRequest.getCookies())
                .filter(f -> f.getName().equals("rememberMe"))
                .findAny()
                .map(Cookie::getValue)
                .orElse("");

        return ResponseEntity.ok(
                new AccountDTO(
                        authPrincipal.getUsername(),
                        authPrincipal.getAccountUserName(),
                        rememberMe
                )
        );
    }

    @PostMapping("/folder")
    @PreAuthorize("isAuthenticated()")
    public FolderDTO addFolder(@RequestBody @Valid FolderRequest request, @AuthenticationPrincipal AuthPrincipal authPrincipal) {
        log.info("Trying to add new folder={}", request);

        return userFacade.addFolder(authPrincipal.getAccountEntity(), request);
    }

    @GetMapping("/unlock/passwords")
    @PreAuthorize("isAuthenticated() and @security.isValidMasterPassword(principal, #masterKey)")
    public List<FolderDTO> unlockPasswords(@RequestParam("masterKey") String masterKey, @AuthenticationPrincipal AuthPrincipal authPrincipal) {
        log.info("User {} trying to fetch passwords", authPrincipal.getAccountUserName());
        return userFacade.getUncodedFolderWithPasswords(authPrincipal.getAccountEntity(), masterKey);
    }

    @DeleteMapping("/folder/{folderId}")
    @PreAuthorize("isAuthenticated() and @security.isFolderOwner(principal, #folderId)")
    public ResponseEntity<MessageModel> removeFolder(@PathVariable("folderId") String folderId) {
        log.info("Trying to remove folder by id={}", folderId);

        userFacade.removeFolder(folderId);

        return ResponseEntity.ok(new MessageModel("Removed folder"));
    }

    @DeleteMapping("/password/{passwordId}")
    @PreAuthorize("isAuthenticated() and @security.isPasswordOwner(principal, #passwordId)")
    public ResponseEntity<MessageModel> removePassword(@PathVariable("passwordId") String passwordId) {
        log.info("Trying to remove password by id={}", passwordId);

        userFacade.deletePassword(passwordId);

        return ResponseEntity.ok(new MessageModel("Removed password"));
    }

    @PostMapping("/folder/{folderId}/password")
    @PreAuthorize("isAuthenticated() and @security.isFolderOwner(principal, #folderId) and @security.isValidMasterPassword(principal, #request.masterKey())")
    public PasswordDTO addPassword(@RequestBody @Valid PasswordRequest request, @PathVariable("folderId") String folderId, @AuthenticationPrincipal AuthPrincipal authPrincipal) {
        log.info("User {} trying to add password", authPrincipal.getAccountUserName());
        return userFacade.addPassword(request, folderId);
    }
}
