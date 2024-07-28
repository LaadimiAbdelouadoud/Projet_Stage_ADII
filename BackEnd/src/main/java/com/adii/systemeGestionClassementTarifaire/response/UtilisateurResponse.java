package com.adii.systemeGestionClassementTarifaire.response;

import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurResponse {

    private Utilisateur utilisateur;
    private String message;
}
