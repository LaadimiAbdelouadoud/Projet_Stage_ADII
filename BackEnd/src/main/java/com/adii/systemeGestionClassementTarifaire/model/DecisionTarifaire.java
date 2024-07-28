package com.adii.systemeGestionClassementTarifaire.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Data
public class DecisionTarifaire {

    @Id
    private Long numNote;
    private String libeleNote;
    private Blob note;

    private String codeTarifaire;

    private LocalDate dateDiffusion;
    private String decision;

    private LocalDate dateDecision;
    private LocalDate dateValidite;

    private String conclusion;

    private boolean valide;

}
