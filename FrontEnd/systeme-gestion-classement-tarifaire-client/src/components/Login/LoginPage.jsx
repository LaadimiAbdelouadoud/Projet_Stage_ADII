import React, { useEffect, useState } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import logo from "../../assets/images/logo.jpg";
import "./LoginPage.css";
import { Link, Navigate } from "react-router-dom";
import RequestPasswordResetPage from "../RequestPasswordResetPage/RequestPasswordResetPage.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [fieldStatus, setFieldStatus] = useState({
    email: "neutral",
    motDePasse: "neutral",
  });

  const [message, setMessage] = useState(""); // State to store API response message

  const [messageStatus, setMessageStatus] = useState("neutral");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleReset = () => {
    setFormData({
      email: "",
      motDePasse: "",
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
    setFieldStatus({
      email: "neutral",
      motDePasse: "neutral",
    });
  };

  //To make sure that there is no Jwt 
  useEffect( ()=> {localStorage.clear();},[]);

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    switch (name) {
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

      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFieldStatus((prevStatus) => ({ ...prevStatus, [name]: status }));

    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("motDePasse", formData.motDePasse);

    if (isEmailValid && isPasswordValid) {
      setFieldStatus({
        email: "success",
        motDePasse: "success",
      });

      api
        .post("http://localhost:8080/utilisateur/authentification", formData)
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
          const { jwt, message, fonctionnaliteList } = response.data;

          localStorage.setItem("jwt", jwt);
          setMessage("Succés."); // Set the message state with the response message
          setMessageStatus("success");
          console.log("User functionalities:", fonctionnaliteList);
          window.location.href = "/PagePrincipale";
        })
        .catch((error) => {
          if (error.response) {
            const { message } = error.response.data;

            if (message === "User account is inactive.") {
              setMessage("Compte désactivé.");
            } else if (message === "Invalid password.") {
              setMessage("Email ou mot de passe incorrect.");
            } else if (message.includes("No users were found")) {
              setMessage("Email ou mot de passe incorrect.");
            } else {
              setMessage("Erreur inconnue.");
            }
            setMessageStatus("error");
          } else {
            console.error("There was an error submitting the form:", error);
            setMessage("Erreur de réseau.");
            setMessageStatus("error");
          }
        });
        
    } else {
      setFieldStatus({
        email: isEmailValid ? "success" : "error",
        motDePasse: isPasswordValid ? "success" : "error",
      });
      setMessage("Email ou motdepasse incorrect.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="loginPage-container">
        <form className="loginPage-form" onSubmit={handleSubmit}>
          <div className="loginPage-title">
            <h1>S'authentifier</h1>
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
              placeholder="Ex: Mon mot de passe"
              value={formData.motDePasse}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.motDePasse}</div>
          </div>

          {/* Valider/Réinitialiser */}
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
            <div className={"errorMessage"}>{message}</div>{" "}
            {/* Display message */}
            <Link to={"/request-password-reset"}>MotDepasse oublié</Link>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default LoginPage;
