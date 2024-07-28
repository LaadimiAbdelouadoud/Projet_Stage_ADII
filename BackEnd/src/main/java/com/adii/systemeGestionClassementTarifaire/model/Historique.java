package com.adii.systemeGestionClassementTarifaire.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Historique {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idHistorique;

    @ManyToOne
    private DecisionTarifaire decisionTarifaire;

    @ManyToOne
    private Utilisateur utilisateur;

    private LocalDate dateDerniereModification;

}
