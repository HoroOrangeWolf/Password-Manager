package com.password.manager.core.db.models;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder(toBuilder = true)
public record FolderDTO(UUID id, String name, int order, List<PasswordDTO> passwordEntries, long lastModified, long createdAt) {
}
