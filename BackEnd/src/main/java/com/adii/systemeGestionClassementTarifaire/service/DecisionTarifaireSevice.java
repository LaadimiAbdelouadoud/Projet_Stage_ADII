package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.Historique;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface DecisionTarifaireSevice {

    public List<DecisionTarifaire> searchDecisionTarifaire(String codeTarifaire);
    public DecisionTarifaire getDecisionByNumNote(Long numNote);
    public List<Historique> listerHistorique(
            Long idUtilisateur,
            Long idHistorique,
            Long numNote,
            LocalDate dateDerniereModification);
}
