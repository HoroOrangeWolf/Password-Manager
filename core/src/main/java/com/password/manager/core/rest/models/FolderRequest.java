package com.password.manager.core.rest.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FolderRequest(@NotNull @Size(min = 3, max = 15) String name) {
}
