package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProfileService {

    public List<Profile> listerProfile(Profile profile);
    public List<Profile> listerProfilesActifs();
    public Profile modifierProfile(Long id, Profile profile) throws Exception;
    public Profile getProfileById(Long id) throws Exception;
}
