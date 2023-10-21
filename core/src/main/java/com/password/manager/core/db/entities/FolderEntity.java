package com.password.manager.core.db.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "folder_entity")
@RequiredArgsConstructor
public class FolderEntity extends AbstractAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "folder_order", nullable = false)
    private int folderOrder;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_entity_id", nullable = false)
    private AccountEntity accountEntity;

    @OneToMany(mappedBy = "folderEntity", orphanRemoval = true)
    private Set<PasswordEntity> passwordEntities = new LinkedHashSet<>();
}