package com.password.manager.core.db.models;

import java.util.List;
import java.util.UUID;

public record FolderDTO(UUID id, String name, int order, List<PasswordDTO> passwordEntries) {
}
