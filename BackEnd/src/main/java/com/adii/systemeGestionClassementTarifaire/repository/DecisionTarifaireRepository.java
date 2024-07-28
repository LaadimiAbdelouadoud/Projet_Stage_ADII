package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.ClassementTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecisionTarifaireRepository extends JpaRepository<DecisionTarifaire, Long> {

    List<DecisionTarifaire> findByCodeTarifaire(String codeTarifaire);

    @Query("SELECT d FROM DecisionTarifaire d WHERE " +
            "(:codeTarifaire IS NULL OR d.codeTarifaire = :codeTarifaire)")
    List<DecisionTarifaire> searchDecision(@Param("codeTarifaire") String codeTarifaire);
}

