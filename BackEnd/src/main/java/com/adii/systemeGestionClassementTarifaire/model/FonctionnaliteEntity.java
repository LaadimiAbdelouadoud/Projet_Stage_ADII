package com.adii.systemeGestionClassementTarifaire.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FonctionnaliteEntity {

    @Id
    @Enumerated(EnumType.STRING)
    private Fonctionnalite fonctionnalite;
    private String description;
}
