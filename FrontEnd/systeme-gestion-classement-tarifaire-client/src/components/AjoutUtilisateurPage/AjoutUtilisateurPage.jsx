import React, { useState, useEffect } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import "./AjoutUtilisateurPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AjoutUtilisateurPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    confirmerMotDePasse: "",
    structure: "",
    profile: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    nom: "neutral",
    prenom: "neutral",
    email: "neutral",
    motDePasse: "neutral",
    confirmerMotDePasse: "neutral",
    structure: "neutral",
    profile: "neutral",
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  //const [structureOptions, setStructureOptions] = useState([]);
  const structureOptions = [
    { id: 1, libele: "Departement1" },
    { id: 2, libele: "Departement2" },
    { id: 3, libele: "Departement3" },
    { id: 4, libele: "Departement4" },
  ];

  const [profileOptions, setProfileOptions] = useState([]);

  useEffect(() => {
    // Fetch structure options from the API
    /*api.get("http://localhost:8080/api/administration/gestion_profile/lister_profile_actif")
      .then(response => {
        setStructureOptions(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the structure options:", error);
      });*/

    // Fetch profile options from the API
    api
      .get(
        "http://localhost:8080/api/administration/gestion_profile/lister_profile_actif"
      )
      .then((response) => {
        setProfileOptions(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the profile options:",
          error
        );
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      confirmerMotDePasse: "",
      structure: "",
      profile: "",
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      nom: "neutral",
      prenom: "neutral",
      email: "neutral",
      motDePasse: "neutral",
      confirmerMotDePasse: "neutral",
      structure: "neutral",
      profile: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    switch (name) {
      case "nom":
        const nomExp = /^[A-Z]+$/;
        if (!value) {
          error = "Veuillez saisir votre email.";
          status = "error";
        } else if (!nomExp.test(value)) {
          error = "Forme non valide (Le nom doit etre en majuscule).";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "prenom":
        const prenomExp = /^[A-Z]{1}[a-zA-Z]+$/;
        if (!value) {
          error = "Veuillez saisir votre email.";
          status = "error";
        } else if (!prenomExp.test(value)) {
          error =
            "Forme non valide (La premiere lettre doit etre en majuscule).";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "structure":
        if (!value) {
          error = `Veuillez saisir votre ${name}.`;
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "email":
        const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          error = "Veuillez saisir votre email.";
          status = "error";
        } else if (!emailExp.test(value)) {
          error = "Forme non valide.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "motDePasse":
        if (!value) {
          error = "Veuillez saisir votre mot de passe.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "confirmerMotDePasse":
        if (!value) {
          error = "Veuillez confirmer votre mot de passe.";
          status = "error";
        } else if (value !== formData.motDePasse) {
          error = "Les mots de passe ne correspondent pas.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "profile":
        if (!value) {
          error = "Veuillez sélectionner un profile.";
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

    const isNomValid = validateField("nom", formData.nom);
    const isPrenomValid = validateField("prenom", formData.prenom);
    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("motDePasse", formData.motDePasse);
    const isConfirmPasswordValid = validateField(
      "confirmerMotDePasse",
      formData.confirmerMotDePasse
    );
    const isStructureValid = validateField("structure", formData.structure);
    const isProfileValid = validateField("profile", formData.profile);

    if (
      isNomValid &&
      isPrenomValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isStructureValid &&
      isProfileValid
    ) {
      const transformedData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        motDePasse: formData.motDePasse,
        structure: structureOptions.find(
          (option) => option.id.toString() === formData.structure
        ).libele,
        profile: {
          libele: profileOptions.find(
            (option) => option.idProfile.toString() === formData.profile
          ).libele,
        },
      };

      console.log("Submitting data:", JSON.stringify(transformedData, null, 2)); // Log the data being sent

      api
        .post(
          "http://localhost:8080/api/administration/gestion_utilisateur/ajouter_utilisateur",
          transformedData
        )
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
          setMessage("Utilisateur ajouté avec succès.");
          setMessageStatus("success");
        })
        .catch((error) => {
          if (
            error.response.status === 400 &&
            error.response.data.jwt === "Email already used."
          ) {
            setMessage("Email déjà utilisé.");
          } else {
            setMessage("Erreur lors de l'ajout de l'utilisateur.");
          }
          setMessageStatus("error");
        });
    } else {
      setFieldStatus({
        nom: isNomValid ? "success" : "error",
        prenom: isPrenomValid ? "success" : "error",
        email: isEmailValid ? "success" : "error",
        motDePasse: isPasswordValid ? "success" : "error",
        confirmerMotDePasse: isConfirmPasswordValid ? "success" : "error",
        structure: isStructureValid ? "success" : "error",
        profile: isProfileValid ? "success" : "error",
      });
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="ajouterUtilisateur-bouttonRetour">
        <button
          className="ajouter-button"
          onClick={() => {
            window.location.href = "/ListerUtilisateurs";
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="ajouterUtilisateur-container">
        <form className="ajouterUtilisateur-form" onSubmit={handleSubmit}>
          <div className="ajouterUtilisateur-title">
            <h1>Ajouter Utilisateur</h1>
          </div>

          {/* Nom */}
          <div className={`input-control ${fieldStatus.nom}`}>
            <label htmlFor="nom">Nom</label>
            <br />
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="NOM"
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
              placeholder="Prénom"
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
              placeholder="Ex: abcdef@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.email}</div>
          </div>

          {/* Mot de passe */}
          <div className={`input-control ${fieldStatus.motDePasse}`}>
            <label htmlFor="motDePasse">Mot de passe</label>
            <br />
            <input
              type="password"
              name="motDePasse"
              id="motDePasse"
              placeholder="Mot de passe"
              value={formData.motDePasse}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.motDePasse}</div>
          </div>

          {/* Confirmer mot de passe */}
          <div className={`input-control ${fieldStatus.confirmerMotDePasse}`}>
            <label htmlFor="confirmerMotDePasse">Confirmer mot de passe</label>
            <br />
            <input
              type="password"
              name="confirmerMotDePasse"
              id="confirmerMotDePasse"
              placeholder="Confirmer mot de passe"
              value={formData.confirmerMotDePasse}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.confirmerMotDePasse}</div>
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
              {structureOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.libele}
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
              <option value="">Sélectionnez un profile</option>
              {profileOptions.map((option) => (
                <option key={option.idProfile} value={option.idProfile}>
                  {option.libele}
                </option>
              ))}
            </select>
            <div className="errorMessage">{formErrors.profile}</div>
          </div>

          {/* Submit button */}
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

          {/* Message */}
          <div className={`message ${messageStatus}`}>{message}</div>
        </form>
      </div>
    </>
  );
};

export default AjoutUtilisateurPage;
