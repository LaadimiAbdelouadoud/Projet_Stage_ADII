package com.adii.systemeGestionClassementTarifaire.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class ClassementTarifaire {

    @Id
    private Long ngp;  //Nomenclature generale de produits
    private Long desNgp;  //desc nome...
    private String numSH;   // num systeme harmonisé
    private String numPos;  // num position

}
