package com.adii.systemeGestionClassementTarifaire.service;

import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import com.adii.systemeGestionClassementTarifaire.repository.ProfileRepository;
import com.adii.systemeGestionClassementTarifaire.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("No users were found with this email: " + email);
        }

        Profile profile = user.getProfile();

        if (profile == null) {
            profile = profileRepository.findByLibele("Utilisateur");
            user.setProfile(profile);
        }

        LocalDate derniereConnection = user.getDerniereConnection();
        LocalDate twoMonthsAgo = LocalDate.now().minusMonths(2);

        if (derniereConnection != null && derniereConnection.isBefore(twoMonthsAgo)) {
            user.setActif(false);
        }

        boolean estActif = user.isActif();

        if (!estActif) {
            throw new UsernameNotFoundException("User account is inactive.");
        }

        user.setDerniereConnection(LocalDate.now());
        userRepository.save(user);

        List<FonctionnaliteEntity> fonctionnaliteEntityList = profile.getListeFonctionnalitesEntity();
        List<GrantedAuthority> authorities = new ArrayList<>();

        for (FonctionnaliteEntity fonctionnaliteEntity : fonctionnaliteEntityList) {
            authorities.add(new SimpleGrantedAuthority(fonctionnaliteEntity.getFonctionnalite().toString()));
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getMotDePasse(), authorities);
    }

}
