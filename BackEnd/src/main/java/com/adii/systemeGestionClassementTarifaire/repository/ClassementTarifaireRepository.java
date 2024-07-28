package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.ClassementTarifaire;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.model.Structure;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassementTarifaireRepository extends JpaRepository<ClassementTarifaire,Long> {

    

}
