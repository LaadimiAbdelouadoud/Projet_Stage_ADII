package com.adii.systemeGestionClassementTarifaire.request;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HistoriqueRequest {

    private Long idUtilisateur;
    private Long idHistorique;
    private Long numNote;
    private LocalDate dateDerniereModification;


}
