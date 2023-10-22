package com.password.manager.core.rest.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PasswordRequest(@NotNull @Size(min = 3, max = 15) String name, @NotNull String login,
                              @NotNull String password, String pageUrl,
                              @NotNull String masterKey) {
}
