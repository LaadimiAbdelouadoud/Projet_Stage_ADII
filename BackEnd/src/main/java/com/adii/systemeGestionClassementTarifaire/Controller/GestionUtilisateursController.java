package com.adii.systemeGestionClassementTarifaire.Controller;


import com.adii.systemeGestionClassementTarifaire.config.JwtService;
import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import com.adii.systemeGestionClassementTarifaire.repository.FonctionnaliteEntityRepository;
import com.adii.systemeGestionClassementTarifaire.repository.ProfileRepository;
import com.adii.systemeGestionClassementTarifaire.repository.UtilisateurRepository;
import com.adii.systemeGestionClassementTarifaire.response.AuthResponse;
import com.adii.systemeGestionClassementTarifaire.response.ProfileResponse;
import com.adii.systemeGestionClassementTarifaire.response.UtilisateurResponse;
import com.adii.systemeGestionClassementTarifaire.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("api/administration/gestion_utilisateur")
public class GestionUtilisateursController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private FonctionnaliteEntityRepository fonctionnaliteEntityRepository;
    @Autowired
    private UtilisateurService utilisateurService;



//Utilisateurs
    @PostMapping("/ajouter_utilisateur")
    public ResponseEntity<AuthResponse> AjouterUtilisateur (@RequestBody Utilisateur user) throws Exception {

        Utilisateur doesUserExist = utilisateurRepository.findByEmail(user.getEmail());

        if(doesUserExist != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse("Email already used.", null, null));
        }

        Utilisateur createdUser = new Utilisateur();

        createdUser.setEmail(user.getEmail());
        createdUser.setNom(user.getNom());
        createdUser.setPrenom(user.getPrenom());
        Profile profile = profileRepository.findByLibele(user.getProfile().getLibele());
        createdUser.setProfile(profile);
        createdUser.setStructure(user.getStructure());
        createdUser.setMotDePasse(passwordEncoder.encode(user.getMotDePasse()));
        createdUser.setDerniereConnection(null);
        createdUser.setActif(true);

        Utilisateur savedUser = utilisateurRepository.save(createdUser);


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getMotDePasse());

        // Generate a JWT token for the new user
        //String token = jwtService.generateToken(authentication);

        List<Fonctionnalite> fonctionnaliteList = new ArrayList<>();

        for(FonctionnaliteEntity fonctionnaliteEntity : profile.getListeFonctionnalitesEntity()){
            fonctionnaliteList.add(fonctionnaliteEntity.getFonctionnalite());
        }



        // Create and return the authentication response
        AuthResponse authResponse = new AuthResponse(null/*token*/, "signup success.", fonctionnaliteList);

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/lister_utilisateur")
    public ResponseEntity<List<Utilisateur>>  listerUtilisateur (@RequestBody Utilisateur utilisateur) throws Exception{

        List<Utilisateur> utilisateurList= utilisateurService.listerUtilisateur(utilisateur);

        return new ResponseEntity<>(utilisateurList, HttpStatus.OK);
    }

    @GetMapping("/lister_utilisateur/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) throws Exception {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        if (utilisateur != null) {
            return new ResponseEntity<>(utilisateur, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/modifier_utilisateur/{id}")
    public ResponseEntity<UtilisateurResponse> modifierUtilisateur (@PathVariable Long id,
                                                                    @RequestBody Utilisateur utilisateur) throws Exception{
        Utilisateur uilisateurModified = utilisateurService.modifierUtilisateur(id, utilisateur);

        UtilisateurResponse utilisateurResponse = new UtilisateurResponse(uilisateurModified, "Utilisateur (id: "+id+") modifié avec succés");
        return new ResponseEntity<>(utilisateurResponse, HttpStatus.OK);
    }



    /*@DeleteMapping("/supprimer_utilisateur/{id}")
    public ResponseEntity<UtilisateurResponse>  supprimerUtilisateur (@PathVariable Long id) throws Exception{
        return null;
    }*/


}

