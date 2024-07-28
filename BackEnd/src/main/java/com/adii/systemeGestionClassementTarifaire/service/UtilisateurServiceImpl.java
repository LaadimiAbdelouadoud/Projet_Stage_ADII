package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.config.JwtService;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.model.Structure;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import com.adii.systemeGestionClassementTarifaire.repository.ProfileRepository;
import com.adii.systemeGestionClassementTarifaire.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {
    @Autowired
    private UtilisateurRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Utilisateur findUserByJwtToken(String token) throws Exception {
        token = token.split(" ")[1].trim();

        String email = jwtService.extractEmail(token);

        return findUserByEmail(email);
    }

    @Override
    public Utilisateur findUserByEmail(String email) throws Exception {
        Utilisateur user = userRepository.findByEmail(email);

        if(user == null){
            throw new Exception("User not found!");
        }

        return user;
    }


    /*
    Seules les informations
    Adresse e-mail, Profil et Accès désactivé sont modifiables
     */
    @Override
    public Utilisateur modifierUtilisateur(Long id, Utilisateur utilisateur) throws Exception {

        Utilisateur utilisateurModified = userRepository.findById(id).get();
        utilisateurModified.setNom(utilisateur.getNom());
        utilisateurModified.setPrenom(utilisateur.getPrenom());
        utilisateurModified.setEmail(utilisateur.getEmail());
        utilisateurModified.setStructure(utilisateur.getStructure());
        Profile profile = profileRepository.findByLibele(utilisateur.getProfile().getLibele());
        utilisateurModified.setProfile(profile);
        utilisateurModified.setActif(utilisateur.isActif());

        return userRepository.save(utilisateurModified);
    }

    /*@Override
    public void supprimerUtilisateur(Long id) throws Exception {

    }*/

    @Override
    public List<Utilisateur> listerUtilisateur(Utilisateur utilisateur) throws Exception {

        List<Utilisateur> utilisateurList;

        Long id = utilisateur.getIdUtilisateur();
        String nom = utilisateur.getNom();
        Structure structure = utilisateur.getStructure();
        Profile profile = profileRepository.findByLibele(utilisateur.getProfile().getLibele());

        utilisateurList = userRepository.searchUtilisateurs(id, nom, structure, profile);


        return utilisateurList;
    }

    @Override
    public Utilisateur getUtilisateurById(Long id) throws Exception {
        return userRepository.findById(id).get();
    }


}
