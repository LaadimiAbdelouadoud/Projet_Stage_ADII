package com.adii.systemeGestionClassementTarifaire.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String motDePasse;
    @Enumerated(EnumType.STRING)
    private Structure structure;
    @ManyToOne(cascade = CascadeType.ALL)
    private Profile profile;
    private LocalDate derniereConnection;
    private boolean actif;
}
