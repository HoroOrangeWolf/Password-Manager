package com.password.manager.core.db.models;

import java.util.UUID;

public record PasswordDTO(UUID id, String name, String login, String password, String pageUrl) {
}
