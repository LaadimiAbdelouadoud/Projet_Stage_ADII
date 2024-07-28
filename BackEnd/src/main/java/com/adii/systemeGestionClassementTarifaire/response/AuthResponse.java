package com.adii.systemeGestionClassementTarifaire.response;

import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.model.FonctionnaliteEntity;
import com.adii.systemeGestionClassementTarifaire.model.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String jwt;

    private String message;

    private List<Fonctionnalite> fonctionnaliteList;
}
