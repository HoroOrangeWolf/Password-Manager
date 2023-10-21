package com.password.manager.core.rest;


import com.password.manager.core.rest.models.RegisterRequest;
import com.password.manager.core.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class RegisterRest {
    private final UserService userFacade;

    @PostMapping
    @PreAuthorize("isAnonymous()")
    public ResponseEntity<String> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            userFacade.registerUser(registerRequest);
            log.info("Registered user={}", registerRequest.email());
            return ResponseEntity.ok("Created new account");
        } catch (Exception e) {
            log.error("Couldn't create new account ", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
