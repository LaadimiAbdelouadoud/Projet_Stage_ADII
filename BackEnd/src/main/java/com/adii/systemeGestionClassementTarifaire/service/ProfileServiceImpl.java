package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.repository.FonctionnaliteEntityRepository;
import com.adii.systemeGestionClassementTarifaire.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private FonctionnaliteEntityRepository fonctionnaliteEntityRepository;


    @Override
    public List<Profile> listerProfile(Profile profile) {
        return profileRepository.searchProfiles(profile.getIdProfile(), profile.getLibele());
    }

    @Override
    public List<Profile> listerProfilesActifs() {
        return profileRepository.findByActif(true);
    }

    @Override
    public Profile modifierProfile(Long id, Profile profile) throws Exception {
        Profile profileModified = profileRepository.findById(id).get();

        String libele = profileModified.getLibele();
        if(profileRepository.findByLibele(libele) != null){
            throw new Exception("Libelé déja utilisé.");
        }

        profileModified.setLibele(libele);

        List<FonctionnaliteEntity> fonctionnaliteEntityListProfile = profile.getListeFonctionnalitesEntity();
        List<FonctionnaliteEntity> fonctionnaliteEntityListProfileModified = new ArrayList<>();

        for (FonctionnaliteEntity fonctionnaliteEntity : fonctionnaliteEntityListProfile){
            fonctionnaliteEntityListProfileModified.add(fonctionnaliteEntityRepository.findByFonctionnalite(fonctionnaliteEntity.getFonctionnalite()));
        }
        profileModified.setListeFonctionnalitesEntity(fonctionnaliteEntityListProfileModified);
        profileModified.setDescription(profile.getDescription());
        profileModified.setActif(profile.isActif());

        return profileRepository.save(profileModified);
    }

    @Override
    public Profile getProfileById(Long id) throws Exception {
        return profileRepository.findById(id).get();
    }


}
