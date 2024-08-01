package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DecisionTarifaireRepository extends JpaRepository<DecisionTarifaire, Long> {

    public List<DecisionTarifaire> findByCodeTarifaire(String codeTarifaire);

    @Query("SELECT d FROM DecisionTarifaire d WHERE " +
            "(:codeTarifaire IS NULL OR d.codeTarifaire = :codeTarifaire) AND " +
            "(:numNote IS NULL OR d.numNote = :numNote) AND " +
            "(:libeleNote IS NULL OR d.libeleNote = :libeleNote) AND " +
            "(:dateDecision IS NULL OR d.dateDecision >= :dateDecision) AND " +
            "(:dateValidite IS NULL OR d.dateValidite <= :dateValidite) AND " +
            "(:motCle IS NULL OR " +
            "   d.libeleNote LIKE %:motCle% OR " +
            "   d.codeTarifaire LIKE %:motCle% OR " +
            "   d.decision LIKE %:motCle% OR " +
            "   d.conclusion LIKE %:motCle%)")
    public List<DecisionTarifaire> searchDecision(
            @Param("codeTarifaire") String codeTarifaire,
            @Param("numNote") Long numNote,
            @Param("libeleNote") String libeleNote,
            @Param("dateDecision") LocalDate dateDecision,
            @Param("dateValidite") LocalDate dateValidite,
            @Param("motCle") String motCle
    );
}
