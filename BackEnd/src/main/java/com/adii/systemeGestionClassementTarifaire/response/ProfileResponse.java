package com.adii.systemeGestionClassementTarifaire.response;

import com.adii.systemeGestionClassementTarifaire.model.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {

    private Profile profile;
    private String message;
}
