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
public interface ProfileRepository extends JpaRepository<Profile,Long> {
    public Profile findByLibele(String libele);
    public List<Profile> findByActif(Boolean Actif);

    @Query("SELECT p FROM Profile p WHERE " +
            "(:idProfile IS NULL OR p.idProfile = :idProfile) AND " +
            "(:libele IS NULL OR p.libele = :libele)")
    List<Profile> searchProfiles(@Param("idProfile") Long idProfile,
                                 @Param("libele") String libele);
}
