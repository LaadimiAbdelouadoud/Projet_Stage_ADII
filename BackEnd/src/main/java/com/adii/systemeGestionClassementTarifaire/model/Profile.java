package com.adii.systemeGestionClassementTarifaire.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idProfile;
    private String libele;
    private String description;
    @ManyToMany
    private List<FonctionnaliteEntity> listeFonctionnalitesEntity = new ArrayList<>();
    private boolean actif;

}
