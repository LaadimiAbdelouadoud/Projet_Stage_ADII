package com.adii.systemeGestionClassementTarifaire.repository;

import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.model.Structure;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {

    public Utilisateur findByEmail(String email);
    public List<Utilisateur> findByNom(String nom);
    @Query("SELECT u FROM Utilisateur u WHERE " +
            "(:idUtilisateur IS NULL OR u.idUtilisateur = :idUtilisateur) AND " +
            "(:nom IS NULL OR u.nom = :nom) AND " +
            "(:structure IS NULL OR u.structure = :structure) AND " +
            "(:profile IS NULL OR u.profile = :profile)")
    public List<Utilisateur> searchUtilisateurs(
            @Param("idUtilisateur") Long idUtilisateur,
            @Param("nom") String nom,
            @Param("structure") Structure structure,
            @Param("profile") Profile profile);
}
