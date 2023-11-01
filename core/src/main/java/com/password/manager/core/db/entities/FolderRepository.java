package com.password.manager.core.db.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {
    @Query("SELECT c FROM FolderEntity c WHERE c.accountEntity.id = ?1")
    List<FolderEntity> findAllByAccountId(UUID id);
}
