package com.password.manager.core.db.models;

import lombok.Builder;

import java.util.UUID;

@Builder(toBuilder = true)
public record PasswordDTO(UUID id, String name, String login, String password, String pageUrl, String parentFolder, long lastModified, long createdAt) {

}
