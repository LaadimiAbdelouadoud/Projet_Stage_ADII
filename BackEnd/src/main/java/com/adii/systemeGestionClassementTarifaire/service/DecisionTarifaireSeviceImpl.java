package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.ClassementTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.Historique;
import com.adii.systemeGestionClassementTarifaire.repository.ClassementTarifaireRepository;
import com.adii.systemeGestionClassementTarifaire.repository.DecisionTarifaireRepository;
import com.adii.systemeGestionClassementTarifaire.repository.HistoriqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DecisionTarifaireSeviceImpl implements DecisionTarifaireSevice {

    @Autowired
    private ClassementTarifaireRepository classementTarifaireRepository;

    @Autowired
    private DecisionTarifaireRepository decisionTarifaireRepository;

    @Autowired
    private HistoriqueRepository historiqueRepository;

    @Override
    public List<DecisionTarifaire> searchDecisionTarifaire(String codeTarifaire) {
        return decisionTarifaireRepository.searchDecision(codeTarifaire);
    }

    @Override
    public DecisionTarifaire getDecisionByNumNote(Long numNote) {
        return decisionTarifaireRepository.findById(numNote).get();
    }
    @Override
    public List<Historique> listerHistorique(
             Long idUtilisateur,
             Long idHistorique,
             Long numNote,
             LocalDate dateDerniereModification) {
        return historiqueRepository.searchHistorique(idUtilisateur, idHistorique, numNote, dateDerniereModification);
    }


}
