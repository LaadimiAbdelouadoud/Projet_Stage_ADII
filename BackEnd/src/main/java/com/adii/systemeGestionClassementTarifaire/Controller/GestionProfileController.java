package com.adii.systemeGestionClassementTarifaire.Controller;

import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.repository.FonctionnaliteEntityRepository;
import com.adii.systemeGestionClassementTarifaire.repository.ProfileRepository;
import com.adii.systemeGestionClassementTarifaire.response.ProfileResponse;
import com.adii.systemeGestionClassementTarifaire.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/administration/gestion_profile")
public class GestionProfileController {


    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private FonctionnaliteEntityRepository fonctionnaliteEntityRepository;


    @PostMapping("/ajout_profile")
    public ResponseEntity<ProfileResponse> AjouterProfile (@RequestBody Profile profile) throws Exception {

        Profile createdProfile = new Profile();

        String libele = profile.getLibele();
        if(profileRepository.findByLibele(libele) != null){
            return new ResponseEntity<>(new ProfileResponse(null,"Libelé deja utilisé"), HttpStatus.BAD_REQUEST);
        }

        createdProfile.setLibele(libele);
        createdProfile.setDescription(profile.getDescription());

        List<FonctionnaliteEntity> fonctionnaliteEntityProfileList = profile.getListeFonctionnalitesEntity();
        List<FonctionnaliteEntity> fonctionnaliteEntityCreatedProfileList = new ArrayList<>();

        for(FonctionnaliteEntity fonctionnaliteEntityProfile : fonctionnaliteEntityProfileList){

            fonctionnaliteEntityCreatedProfileList.add(fonctionnaliteEntityRepository.findByFonctionnalite(fonctionnaliteEntityProfile.getFonctionnalite()));
        }
        createdProfile.setListeFonctionnalitesEntity(fonctionnaliteEntityCreatedProfileList);
        createdProfile.setActif(true);

        Profile savedProfile = profileRepository.save(createdProfile);

        return new ResponseEntity<>(new ProfileResponse(savedProfile, "Profile crée avec succés"), HttpStatus.CREATED);
    }

    @PostMapping("/lister_profile")
    public ResponseEntity<List<Profile>>  listerProfile (@RequestBody Profile profile) throws Exception{

        List<Profile> profileList= profileService.listerProfile(profile);

        return new ResponseEntity<>(profileList, HttpStatus.OK);
    }

    @GetMapping("/lister_profile_actif")
    public ResponseEntity<List<Profile>>  listerProfilesActifs () throws Exception{

        List<Profile> profileList= profileService.listerProfilesActifs();

        return new ResponseEntity<>(profileList, HttpStatus.OK);
    }

    @GetMapping("/lister_profile/{id}")
    public ResponseEntity<Profile> getUtilisateurById(@PathVariable Long id) throws Exception {
        Profile profile = profileService.getProfileById(id);
        if (profile != null) {
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/modifier_profile/{id}")
    public ResponseEntity<ProfileResponse> modifierProfile (@PathVariable Long id,
                                                            @RequestBody Profile profile) throws Exception{
        Profile profileModified = profileService.modifierProfile(id,profile);

        ProfileResponse profileResponse = new ProfileResponse(profileModified, "profile (id: "+id+") modifié avec succés");
        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }


}
