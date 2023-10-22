package com.password.manager.core.rest;


import com.password.manager.core.rest.models.MessageModel;
import com.password.manager.core.rest.models.RegisterRequest;
import com.password.manager.core.service.UserFacade;
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
    private final UserFacade userFacade;

    @PostMapping
    @PreAuthorize("isAnonymous()")
    public ResponseEntity<MessageModel> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        userFacade.registerUser(registerRequest);
        log.info("Registered user={}", registerRequest.email());
        return ResponseEntity.ok(new MessageModel("Created new account"));
    }
}
