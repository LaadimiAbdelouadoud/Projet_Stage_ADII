package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FonctionnaliteEntityRepository extends JpaRepository<FonctionnaliteEntity, Fonctionnalite> {

    public FonctionnaliteEntity findByFonctionnalite(Fonctionnalite fonctionnalite);
}
