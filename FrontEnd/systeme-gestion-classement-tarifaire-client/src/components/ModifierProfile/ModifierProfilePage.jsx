import React, { useState, useEffect } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import "./ModifierProfilePage.css";
import Menu from "../Menu/Menu.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";

const ModifierProfilePage = () => {
  const { id } = useParams();
  const [profileId, setProfileId] = useState(id);

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
    {
      id: 2,
      name: "Role Gestionnaire Decision",
      value: "ROLE_GESTIONNAIRE_DECISION",
    },
    {
      id: 3,
      name: "Role Gestionnaire Utilisateur",
      value: "ROLE_GESTIONNAIRE_UTILISATEUR",
    },
  ]);

  useEffect(() => {
    // Fetch profile details for the given id
    if (id) {
      api
        .get(
          `http://localhost:8080/api/administration/gestion_profile/lister_profile/${id}`
        )
        .then((response) => {
          const { libele, description, actif, listeFonctionnalitesEntity } =
            response.data;
          setFormData({
            libele: libele || "",
            description: description || "",
            actif: actif !== undefined ? actif.toString() : "",
            listeFonctionnalitesEntity: listeFonctionnalitesEntity || [],
          });
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the profile details:",
            error
          );
        });
    }
  }, [id]);

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
          setMessage("Profil modifié avec succès.");
          setMessageStatus("success");
        })
        .catch((error) => {
          console.error("There was an error modifying the profile:", error);
          setMessage("Erreur lors de la modification du profil.");
          setMessageStatus("error");
        });
    } else {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="modifierProfilePage-bouttonRetour">
        <button
          className="modifier-button"
          onClick={() => {
            window.location.href = "/ListerProfiles";
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="modifierProfilePage-container">
        <form className="modifierProfilePage-form" onSubmit={handleSubmit}>
          <div className="modifierProfilePage-title">
            <h1>Modifier Profil</h1>
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
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.description}</div>
          </div>

          <div className={`input-control ${fieldStatus.actif}`}>
            <label htmlFor="actif">Statut</label>
            <br />
            <select
              name="actif"
              id="actif"
              value={formData.actif}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un statut</option>
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
            <div className="errorMessage">{formErrors.actif}</div>
          </div>

          <div
            className={`input-control ${fieldStatus.listeFonctionnalitesEntity}`}
          >
            <label>Fonctionnalités</label>
            <br />
            {fonctionnalites.map((fonctionnalite) => (
              <div key={fonctionnalite.id}>
                <input
                  type="checkbox"
                  id={fonctionnalite.id}
                  name="listeFonctionnalitesEntity"
                  value={fonctionnalite.value}
                  checked={formData.listeFonctionnalitesEntity.some(
                    (f) => f.fonctionnalite === fonctionnalite.value
                  )}
                  onChange={handleChange}
                />
                <label htmlFor={fonctionnalite.id}>{fonctionnalite.name}</label>
              </div>
            ))}
            <div className="errorMessage">
              {formErrors.listeFonctionnalitesEntity}
            </div>
          </div>
          <div className="submitButton">
            <button className="valider" type="submit">
              Modifier
            </button>
            <button
              className="reinitialiser"
              type="button"
              onClick={handleReset}
            >
              Réinitialiser
            </button>

            {message && (
              <div className={`message ${messageStatus}`}>{message}</div>
            )}
          </div>
        </form>
      </div>

    </>
  );
};

export default ModifierProfilePage;
