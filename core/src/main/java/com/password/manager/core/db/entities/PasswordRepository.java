package com.password.manager.core.db.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PasswordRepository extends JpaRepository<PasswordEntity, UUID> {
    @Query("SELECT c FROM FolderEntity u JOIN PasswordEntity c ON c.folderEntity.id = u.id WHERE u.accountEntity.id = ?1")
    List<PasswordEntity> findAllUsersPasswords(UUID userAccountId);
}
