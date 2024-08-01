import React, { useState } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import logo from "../../assets/images/logo.jpg";
import "./RequestPasswordResetPage.css"; // Ensure you create and style this CSS file similarly to LoginPage.css

const RequestPasswordResetPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    email: "neutral",
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
      email: "",
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      email: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    if (name === "email") {
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
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFieldStatus((prevStatus) => ({ ...prevStatus, [name]: status }));

    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateField("email", formData.email);

    if (isEmailValid) {
      setFieldStatus({
        email: "success",
      });

      api
        .post("http://localhost:8080/utilisateur/resetPassword", null, {
          params: { email: formData.email },
        })
        .then((response) => {
          setMessage("Email de réinitialisation envoyé.");
          setMessageStatus("success");
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
        email: isEmailValid ? "success" : "error",
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
      <div className="resetPasswordPage-container">
        <form className="resetPasswordPage-form" onSubmit={handleSubmit}>
          <div className="resetPasswordPage-title">
            <h1>Réinitialiser le mot de passe</h1>
          </div>

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

export default RequestPasswordResetPage;
