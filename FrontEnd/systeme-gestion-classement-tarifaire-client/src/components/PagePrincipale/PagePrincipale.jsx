import React from "react";
import "./PagePrincipale.css"; // Import the corresponding CSS file
import logo from "../../assets/images/logo.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { NavLink } from "react-router-dom";

const PagePrincipale = () => {
  const [text] = useTypewriter({
    words: ["Veuillez Choisir une fonctionnalité."],
    typeSpeed: 100,
    loop: 0,
  });

  const handleItemClick = (text) => {
    switch (text) {
      case "deconnection":
        window.location.href = "/";
        break;
      case "utilisateurs":
        window.location.href = "/ListerUtilisateurs";
        console.log("Managing users...");
        break;
      case "profiles":
        window.location.href = "/ListerProfiles";
        console.log("Managing profiles...");
        break;
      case "decisions":
        window.location.href = '/ListerDecisions';
        console.log("Managing decisions...");
        break;
      default:
        break;
    }
  };

  return (
    <div className="PagePrincipale-container">
      <div className="pagePrincipale-left-part">
        <p className="pagePrincipale-texte">
          Bienvenue,
          {text}
          <Cursor cursorStyle="|" />
        </p>
      </div>
      <div className="pagePrincipale-right-part">
        <img src={logo} alt="Logo" className="logo" />
        <div className="PagePrincipale-button-container">
          <NavLink to="/AjoutUtilisateur">
            <button
              className="PagePrincipale-button"
              onClick={() => handleItemClick('utilisateurs')}
            >
              Gestion Utilisateurs
            </button>
          </NavLink>
          <button
            className="PagePrincipale-button"
            onClick={() => handleItemClick('profiles')}
          >
            Gestion Profiles
          </button>
          <button
            className="PagePrincipale-button"
            onClick={() => handleItemClick('decisions')}
          >
            Gestion Décisions
          </button>
          <button
            className="PagePrincipale-button disconnect"
            onClick={() => handleItemClick('deconnection')}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagePrincipale;
