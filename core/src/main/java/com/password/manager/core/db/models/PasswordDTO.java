package com.password.manager.core.db.models;

import lombok.Builder;

import java.util.UUID;

@Builder(toBuilder = true)
public record PasswordDTO(UUID id, String name, String login, String password, String pageUrl, long lastModified, long createdAt) {
}
