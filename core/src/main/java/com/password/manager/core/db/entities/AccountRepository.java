package com.password.manager.core.db.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, String> {
    @Query("select c from AccountEntity c WHERE c.email = ?1 OR c.username = ?2")
    Optional<AccountEntity> findByEmailOrUsername(String email, String username);

    Optional<AccountEntity> findByEmail(String email);
}
