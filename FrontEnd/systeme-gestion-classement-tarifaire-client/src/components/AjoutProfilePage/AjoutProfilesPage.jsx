import React, { useState } from "react";
import api from "../../api";
import Menu from "../Menu/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./AjoutProfilesPage.css"; // Import the CSS file for styling

const AjoutProfilesPage = () => {
  const [formData, setFormData] = useState({
    libele: "",
    description: "",
    actif: "",
    listeFonctionnalitesEntity: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    libele: "neutral",
    description: "neutral",
    actif: "neutral",
    listeFonctionnalitesEntity: "neutral",
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  const [profiles, setProfiles] = useState([]);
  const [fonctionnalites] = useState([
    { id: 1, name: "Role Utilisateur", value: "ROLE_UTILISATEUR" },
    { id: 2, name: "Role Gestionnaire Decision", value: "ROLE_GESTIONNAIRE_DECISION" },
    { id: 3, name: "Role Gestionnaire Utilisateur", value: "ROLE_GESTIONNAIRE_UTILISATEUR" },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedFonctionnalites = checked
        ? [...formData.listeFonctionnalitesEntity, { fonctionnalite: value }]
        : formData.listeFonctionnalitesEntity.filter(
            (f) => f.fonctionnalite !== value
          );

      setFormData((prevFormData) => ({
        ...prevFormData,
        listeFonctionnalitesEntity: updatedFonctionnalites,
      }));
      validateField("listeFonctionnalitesEntity", updatedFonctionnalites);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      validateField(name, value);
    }
    console.log(JSON.stringify(formData, null,2));
  };

  const handleReset = () => {
    setFormData({
      libele: "",
      description: "",
      actif: "",
      listeFonctionnalitesEntity: [],
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      libele: "neutral",
      description: "neutral",
      actif: "neutral",
      listeFonctionnalitesEntity: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    switch (name) {
      case "libele":
        if (!value) {
          error = "Veuillez saisir un libele.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "description":
        if (!value) {
          error = "Veuillez saisir une description.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "actif":
        if (value === "") {
          error = "Veuillez sélectionner un statut.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "listeFonctionnalitesEntity":
        if (value.length === 0) {
          error = "Veuillez sélectionner au moins une fonctionnalité.";
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

    const isLibeleValid = validateField("libele", formData.libele);
    const isDescriptionValid = validateField(
      "description",
      formData.description
    );
    const isActifValid = validateField("actif", formData.actif);
    const isFonctionnalitesValid = validateField(
      "listeFonctionnalitesEntity",
      formData.listeFonctionnalitesEntity
    );

    if (
      isLibeleValid &&
      isDescriptionValid &&
      isActifValid &&
      isFonctionnalitesValid
    ) {
      console.log("data: ", JSON.stringify(formData, null, 2));
      api
        .post(
          "http://localhost:8080/api/administration/gestion_profile/ajout_profile",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setProfiles([...profiles, response.data.profile]);
          handleReset();
          setMessage("Profil ajouté avec succès.");
          setMessageStatus("success");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const { message } = error.response.data;
            if (message === "Libelé deja utilisé") {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                libele: "Ce libelé est déjà utilisé. Veuillez en choisir un autre.",
              }));
              setFieldStatus((prevStatus) => ({
                ...prevStatus,
                libele: "error",
              }));
            } else {
              setMessage(message);
            }
            setMessageStatus("error");
          } else {
            console.error("There was an error adding the profile:", error);
            setMessage("Erreur lors de l'ajout du profil.");
            setMessageStatus("error");
          }
        });
    } else {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
    <div className="ajouterUtilisateur-bouttonRetour">
      <button className="ajouter-button" onClick={()=>{window.location.href = "/ListerProfiles";}}><ArrowBackIcon/></button>
      </div>
      <div className="ajouterUtilisateur-container">
        <form className="ajouterUtilisateur-form" onSubmit={handleSubmit}>
          <div className="ajouterUtilisateur-title">
            <h1>Ajouter Profil</h1>
          </div>

          <div className={`input-control ${fieldStatus.libele}`}>
            <label htmlFor="libele">Libele</label>
            <br />
            <input
              type="text"
              name="libele"
              id="libele"
              placeholder="Libele"
              value={formData.libele}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.libele}</div>
          </div>

          <div className={`input-control ${fieldStatus.description}`}>
            <label htmlFor="description">Description</label>
            <br />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.description}</div>
          </div>

          <div className={`input-control ${fieldStatus.listeFonctionnalitesEntity}`}>
            <label htmlFor="listeFonctionnalitesEntity">Fonctionnalités</label>
            <br />
            <div className="checkbox-table">
              {fonctionnalites.map((fonctionnalite) => (
                <div key={fonctionnalite.id} className="checkbox-item">
                  <label>{fonctionnalite.name}</label>
                  <input
                    type="checkbox"
                    name="listeFonctionnalitesEntity"
                    value={fonctionnalite.value}
                    checked={formData.listeFonctionnalitesEntity.some(
                      (f) => f.fonctionnalite === fonctionnalite.value
                    )}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="errorMessage">
              {formErrors.listeFonctionnalitesEntity}
            </div>
          </div>

          <div className={`input-control ${fieldStatus.actif}`}>
            <label htmlFor="actif">Actif</label>
            <br />
            <select
              name="actif"
              id="actif"
              value={formData.actif}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </select>
            <div className="errorMessage">{formErrors.actif}</div>
          </div>

          <div className="submitButton">
            <button type="submit" className="valider">
              Ajouter
            </button>
            <button
              type="button"
              className="reinitialiser"
              onClick={handleReset}
            >
              Réinitialiser
            </button>
          </div>

          <div className={`message ${messageStatus}`}>{message}</div>
        </form>
      </div>
    </>
  );
};

export default AjoutProfilesPage;
