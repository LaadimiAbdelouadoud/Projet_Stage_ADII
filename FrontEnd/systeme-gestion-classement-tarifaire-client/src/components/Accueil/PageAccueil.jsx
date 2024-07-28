import React from "react";
import "./PageAccueil.css";
import logo from "../../assets/images/logo.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from 'react-router-dom';

const PageAccueil = () => {
  const [text] = useTypewriter({
    words: [" au système de gestion des decisions tarifaires."],
    typeSpeed: 100,
    loop: 0,
  });

  return (
    <div className="PageAccueil-container">
      <div className="pageAccueil-left-part">
        <p className="pageAccueil-texte">
          Bienvenue
          {text}
          <Cursor cursorStyle="|" />
        </p>
      </div>
      <div className="pageAccueil-right-part">
        <img src={logo} alt="Logo" className="logo" />
        <div className="PageAccueil-button-authentifier-container">
          <Link to='/login'>
            <button className="PageAccueil-button-authentifier">
              S'authentifier
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageAccueil;
