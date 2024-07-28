import React, { useState, useEffect } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import "./ModifierUtilisateurPage.css";
import Menu from "../Menu/Menu.jsx";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ModifierUtilisateurPage = () => {
  const { id } = useParams();
  const [utilisateurId, setUtilisateurId] = useState(id);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    structure: "",
    profile: "",
    actif: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    nom: "neutral",
    prenom: "neutral",
    email: "neutral",
    structure: "neutral",
    profile: "neutral",
    actif: "neutral",
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  const structureOptions = [
    { id: 1, libele: "Departement1" },
    { id: 2, libele: "Departement2" },
    { id: 3, libele: "Departement3" },
    { id: 4, libele: "Departement4" },
  ];

  const [profileOptions, setProfileOptions] = useState([]);

  useEffect(() => {
    // Fetch profile options from the API
    api
      .get("http://localhost:8080/api/administration/gestion_profile/lister_profile_actif")
      .then((response) => {
        setProfileOptions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile options:", error);
      });

    // Fetch utilisateur details for the given id
    if (id) {
      api
        .get(`http://localhost:8080/api/administration/gestion_utilisateur/lister_utilisateur/${id}`)
        .then((response) => {
          const { nom, prenom, email, structure, profile, actif } = response.data;
          setFormData({
            nom: nom || "",
            prenom: prenom || "",
            email: email || "",
            structure: structure || "",
            profile: profile?.libele || "",
            actif: actif || false,
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the utilisateur details:", error);
        });
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    validateField(name, checked);
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      structure: "",
      profile: "",
      actif: false,
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      nom: "neutral",
      prenom: "neutral",
      email: "neutral",
      structure: "neutral",
      profile: "neutral",
      actif: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    switch (name) {
      case "nom":
        const nomExp = /^[A-Z]+$/;
        if (!value) {
          error = "Veuillez saisir le nom.";
          status = "error";
        } else if (!nomExp.test(value)) {
          error = "Forme non valide (Le nom doit être en majuscule).";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "prenom":
        const prenomExp = /^[A-Z][a-zA-Z]*$/;
        if (!value) {
          error = "Veuillez saisir le prénom.";
          status = "error";
        } else if (!prenomExp.test(value)) {
          error = "Forme non valide (La première lettre doit être en majuscule).";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "structure":
        if (!value) {
          error = "Veuillez sélectionner une structure.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "email":
        const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          error = "Veuillez saisir l'email.";
          status = "error";
        } else if (!emailExp.test(value)) {
          error = "Forme non valide.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "profile":
        if (!value) {
          error = "Veuillez sélectionner un profil.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFieldStatus((prevStatus) => ({ ...prevStatus, [name]: status }));

    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    const isNomValid = validateField("nom", formData.nom);
    const isPrenomValid = validateField("prenom", formData.prenom);
    const isEmailValid = validateField("email", formData.email);
    const isStructureValid = validateField("structure", formData.structure);
    const isProfileValid = validateField("profile", formData.profile);
    const isActifValid = validateField("actif", formData.actif);

    if (isNomValid && isPrenomValid && isEmailValid && isStructureValid && isProfileValid && isActifValid) {
      const updatedData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        structure: formData.structure, // Assuming this is already a string
        profile: {
          libele: formData.profile, // Ensure this is a string
        },
        actif: formData.actif,
      };

      

      api
        .put(`http://localhost:8080/api/administration/gestion_utilisateur/modifier_utilisateur/${utilisateurId}`, updatedData)
        .then((response) => {
          console.log("Utilisateur updated successfully:", response.data);
          setMessage("Utilisateur modifié avec succès.");
          setMessageStatus("success");
        })
        .catch((error) => {
          console.error("Error updating utilisateur:", error);
          setMessage("Erreur lors de la modification de l'utilisateur.");
          setMessageStatus("error");
        });
    } else {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="modifierUtilisateur-bouttonRetour">
        <button
          className="modifier-button"
          onClick={() => {
            window.location.href = "/ListerUtilisateurs";
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="modifierUtilisateur-container">
        <form className="modifierUtilisateur-form" onSubmit={handleSubmit}>
          <div className="modifierUtilisateur-title">
            <h1>Modifier Utilisateur</h1>
          </div>

          {/* ID */}
          <div className="input-control">
            <label id="id-label" htmlFor="id">ID</label>
            <br />
            <input
              type="text"
              name="id"
              id="id"
              value={utilisateurId}
              disabled
            />
          </div>

          {/* Nom */}
          <div className={`input-control ${fieldStatus.nom}`}>
            <label htmlFor="nom">Nom</label>
            <br />
            <input
              type="text"
              name="nom"
              id="nom"
              value={formData.nom}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.nom}</div>
          </div>

          {/* Prénom */}
          <div className={`input-control ${fieldStatus.prenom}`}>
            <label htmlFor="prenom">Prénom</label>
            <br />
            <input
              type="text"
              name="prenom"
              id="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.prenom}</div>
          </div>

          {/* Email */}
          <div className={`input-control ${fieldStatus.email}`}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.email}</div>
          </div>

          {/* Structure */}
          <div className={`input-control ${fieldStatus.structure}`}>
            <label htmlFor="structure">Structure</label>
            <br />
            <select
              name="structure"
              id="structure"
              value={formData.structure}
              onChange={handleChange}
            >
              <option value="">Sélectionnez une structure</option>
              {structureOptions.map((structure) => (
                <option key={structure.id} value={structure.libele}>
                  {structure.libele}
                </option>
              ))}
            </select>
            <div className="errorMessage">{formErrors.structure}</div>
          </div>

          {/* Profile */}
          <div className={`input-control ${fieldStatus.profile}`}>
            <label htmlFor="profile">Profile</label>
            <br />
            <select
              name="profile"
              id="profile"
              value={formData.profile}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un profil</option>
              {profileOptions.map((profile) => (
                <option key={profile.idProfile} value={profile.libele}>
                  {profile.libele}
                </option>
              ))}
            </select>
            <div className="errorMessage">{formErrors.profile}</div>
          </div>

          {/* Actif */}
          <div className={`input-control ${fieldStatus.actif}`}>
            <label htmlFor="actif">Actif</label>
            <input
              type="checkbox"
              name="actif"
              id="actif"
              checked={formData.actif}
              onChange={handleToggleChange}
            />
            <div className="errorMessage">{formErrors.actif}</div>
          </div>

          {/* Submit Button */}
          <div className="submitButton">
            <button className="valider" type="submit">Modifier</button>
            <button className="reinitialiser" type="button" onClick={handleReset}>
              Réinitialiser
            </button>
          </div>

          {/* Message */}
          <div className={`message ${messageStatus}`}>{message}</div>
        </form>
      </div>
    </>
  );
};

export default ModifierUtilisateurPage;
