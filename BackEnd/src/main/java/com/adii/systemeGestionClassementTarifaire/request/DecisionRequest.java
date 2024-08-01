package com.adii.systemeGestionClassementTarifaire.request;

import com.adii.systemeGestionClassementTarifaire.model.DecisionTarifaire;
import lombok.Data;

@Data
public class DecisionRequest {
    private DecisionTarifaire decisionTarifaire;
    private String motCle;
}
