package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoriqueRepository extends JpaRepository<Historique, Long> {

    @Query("SELECT h FROM Historique h " +
            "JOIN h.utilisateur u " +
            "JOIN h.decisionTarifaire d " +
            "WHERE (:idUtilisateur IS NULL OR u.idUtilisateur = :idUtilisateur) AND " +
            "(:idHistorique IS NULL OR h.idHistorique = :idHistorique) AND " +
            "(:numNote IS NULL OR d.numNote = :numNote) AND " +
            "(:dateDerniereModification IS NULL OR h.dateDerniereModification = :dateDerniereModification)")
    List<Historique> searchHistorique(
            @Param("idUtilisateur") Long idUtilisateur,
            @Param("idHistorique") Long idHistorique,
            @Param("numNote") Long numNote,
            @Param("dateDerniereModification") LocalDate dateDerniereModification);

}
