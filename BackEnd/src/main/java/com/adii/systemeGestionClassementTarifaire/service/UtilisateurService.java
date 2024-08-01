package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UtilisateurService {
    public Utilisateur findUserByJwtToken(String token) throws Exception;

    public Utilisateur findUserByEmail(String email) throws Exception;
    public Utilisateur modifierUtilisateur(Long id, Utilisateur utilisateur) throws Exception;
    /*public void supprimerUtilisateur(Long id) throws Exception;*/
    public List<Utilisateur> listerUtilisateur(Utilisateur utilisateur) throws Exception;

    public Utilisateur getUtilisateurById(Long id) throws Exception;
    public void createPasswordResetTokenForUser(Utilisateur user, String token);
    public void sendPasswordResetEmail(Utilisateur user, String token);
    public Utilisateur getUserByPasswordResetToken(String token);
    public void changeUserPassword(Utilisateur user, String password);
}
