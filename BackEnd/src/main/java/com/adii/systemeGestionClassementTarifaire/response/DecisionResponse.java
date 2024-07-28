package com.adii.systemeGestionClassementTarifaire.response;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class DecisionResponse {

    private DecisionTarifaire decisionTarifaire;
    private String message;

}
