import React, { useState } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import logo from "../../assets/images/logo.jpg";
import "./PasswordResetPage.css"; // Ensure you create and style this CSS file similarly to LoginPage.css
import { useParams, useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    newPassword: "neutral",
    confirmPassword: "neutral",
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleReset = () => {
    setFormData({
      newPassword: "",
      confirmPassword: "",
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      newPassword: "neutral",
      confirmPassword: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    if (name === "newPassword") {
      if (!value) {
        error = "Veuillez saisir votre nouveau mot de passe.";
        status = "error";
      } else {
        status = "success";
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        error = "Veuillez confirmer votre nouveau mot de passe.";
        status = "error";
      } else if (value !== formData.newPassword) {
        error = "Les mots de passe ne correspondent pas.";
        status = "error";
      } else {
        status = "success";
      }
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFieldStatus((prevStatus) => ({ ...prevStatus, [name]: status }));

    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNewPasswordValid = validateField("newPassword", formData.newPassword);
    const isConfirmPasswordValid = validateField("confirmPassword", formData.confirmPassword);

    if (isNewPasswordValid && isConfirmPasswordValid) {
      setFieldStatus({
        newPassword: "success",
        confirmPassword: "success",
      });

      api
        .post("http://localhost:8080/utilisateur/savePassword", null, {
          params: { token, password: formData.newPassword },
        })
        .then((response) => {
          setMessage("Mot de passe réinitialisé avec succès.");
          setMessageStatus("success");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect to login page after 2 seconds
        })
        .catch((error) => {
          if (error.response) {
            const { message } = error.response.data;
            setMessage(message || "Erreur inconnue.");
          } else {
            setMessage("Erreur de réseau.");
          }
          setMessageStatus("error");
        });
    } else {
      setFieldStatus({
        newPassword: isNewPasswordValid ? "success" : "error",
        confirmPassword: isConfirmPasswordValid ? "success" : "error",
      });
      setMessage("Veuillez corriger les erreurs.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="passwordResetPage-container">
        <form className="passwordResetPage-form" onSubmit={handleSubmit}>
          <div className="passwordResetPage-title">
            <h1>Réinitialiser le mot de passe</h1>
          </div>

          <div className={`input-control ${fieldStatus.newPassword}`}>
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <br />
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.newPassword}</div>
          </div>

          <div className={`input-control ${fieldStatus.confirmPassword}`}>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.confirmPassword}</div>
          </div>

          <div className={`submitButton input-control ${messageStatus}`}>
            <button type="submit" name="valider" className="valider">
              Valider
            </button>
            <button
              type="button"
              name="reinitialiser"
              className="reinitialiser"
              onClick={handleReset}
            >
              Réinitialiser
            </button>
            <div className={"errorMessage"}>{message}</div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordResetPage;
