package com.adii.systemeGestionClassementTarifaire.Controller;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.Historique;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import com.adii.systemeGestionClassementTarifaire.repository.DecisionTarifaireRepository;
import com.adii.systemeGestionClassementTarifaire.repository.HistoriqueRepository;
import com.adii.systemeGestionClassementTarifaire.request.HistoriqueRequest;
import com.adii.systemeGestionClassementTarifaire.response.DecisionResponse;
import com.adii.systemeGestionClassementTarifaire.service.DecisionTarifaireSevice;
import com.adii.systemeGestionClassementTarifaire.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/Decision/")
public class GestionDecisionTarifaireController {

    @Autowired
    private DecisionTarifaireRepository decisionTarifaireRepository;

    @Autowired
    private HistoriqueRepository historiqueRepository;

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private DecisionTarifaireSevice decisionTarifaireService;


    @PostMapping("/ajouter_decision")
    public ResponseEntity<DecisionTarifaire> ajouterDecision
                    (@RequestHeader("Authorization") String token,
                    @RequestBody DecisionTarifaire decisionTarifaire) throws Exception {

        DecisionTarifaire decisionTarifaireCreated = new DecisionTarifaire();

        decisionTarifaireCreated.setNumNote(decisionTarifaire.getNumNote());

        decisionTarifaireCreated.setLibeleNote(decisionTarifaire.getLibeleNote());
        /*Provisoire*/
        decisionTarifaireCreated.setCodeTarifaire(decisionTarifaire.getCodeTarifaire());

        /**/

        decisionTarifaireCreated.setDateDiffusion(decisionTarifaire.getDateDiffusion());

        decisionTarifaireCreated.setDecision(decisionTarifaire.getDecision());

        decisionTarifaireCreated.setDateDecision(decisionTarifaire.getDateDecision());

        decisionTarifaireCreated.setDateValidite(decisionTarifaire.getDateValidite());

        decisionTarifaireCreated.setValide(decisionTarifaire.isValide());

        decisionTarifaireCreated.setConclusion(decisionTarifaire.getConclusion());

        DecisionTarifaire decisionTarifaireStored = decisionTarifaireRepository.save(decisionTarifaireCreated);

        Historique historique = new Historique();

        historique.setDecisionTarifaire(decisionTarifaireStored);

        Utilisateur utilisateur = utilisateurService.findUserByJwtToken(token);

        historique.setUtilisateur(utilisateur);

        historique.setDateDerniereModification(LocalDate.now());

        historiqueRepository.save(historique);



        return new ResponseEntity<>(decisionTarifaire, HttpStatus.CREATED);
    }


    @PostMapping("/lister_decision")
    public List<DecisionTarifaire> listerDecisionsTarifaires(@RequestBody DecisionTarifaire decisionTarifaire) {
        return decisionTarifaireService.searchDecisionTarifaire(decisionTarifaire.getCodeTarifaire());
    }

    @GetMapping("/lister_decision/{id}")
    public ResponseEntity<DecisionTarifaire> getDecisionById(@PathVariable Long id) throws Exception {
        DecisionTarifaire decisionTarifaire = decisionTarifaireService.getDecisionByNumNote(id);
        if (decisionTarifaire != null) {
            return new ResponseEntity<>(decisionTarifaire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/modifier_decision/{id}")
    public ResponseEntity<DecisionTarifaire> modifierDecisionTarifaire (@PathVariable Long id,
                                                                       @RequestHeader("Authorization") String token,
                                                                       @RequestBody DecisionTarifaire decisionTarifaire) throws Exception {

        DecisionTarifaire decisionTarifaireModified = decisionTarifaireRepository.findById(id).get();

        decisionTarifaireModified.setNumNote(decisionTarifaire.getNumNote());

        decisionTarifaireModified.setLibeleNote(decisionTarifaire.getLibeleNote());
        /*Provisoire*/
        decisionTarifaireModified.setCodeTarifaire(decisionTarifaireModified.getCodeTarifaire());

        /**/

        decisionTarifaireModified.setDateDiffusion(decisionTarifaire.getDateDiffusion());

        decisionTarifaireModified.setDecision(decisionTarifaire.getDecision());

        decisionTarifaireModified.setDateDecision(decisionTarifaire.getDateDecision());

        decisionTarifaireModified.setDateValidite(decisionTarifaire.getDateValidite());

        decisionTarifaireModified.setValide(decisionTarifaire.isValide());

        decisionTarifaireModified.setConclusion(decisionTarifaire.getConclusion());

        DecisionTarifaire decisionTarifaireStored = decisionTarifaireRepository.save(decisionTarifaireModified);

        Historique historique = new Historique();

        historique.setDecisionTarifaire(decisionTarifaireStored);

        Utilisateur utilisateur = utilisateurService.findUserByJwtToken(token);

        historique.setUtilisateur(utilisateur);

        historique.setDateDerniereModification(LocalDate.now());

        historiqueRepository.save(historique);



        return new ResponseEntity<>(decisionTarifaireStored, HttpStatus.CREATED);
    }

    @PostMapping("/lister_historique")
    public List<Historique> listerDecisionsTarifaires(@RequestBody HistoriqueRequest historiqueRequest) {
        return decisionTarifaireService.listerHistorique(historiqueRequest.getIdUtilisateur(), historiqueRequest.getIdHistorique(), historiqueRequest.getNumNote(), historiqueRequest.getDateDerniereModification() );
    }


}
