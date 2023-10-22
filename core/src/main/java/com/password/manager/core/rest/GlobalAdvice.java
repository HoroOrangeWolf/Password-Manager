package com.password.manager.core.rest;

import com.password.manager.core.rest.models.MessageModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalAdvice {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageModel> messageModelResponseEntity(Exception e) {
        log.error("Error while executing request", e);
        return ResponseEntity.badRequest().body(new MessageModel(e.getMessage()));
    }
}
