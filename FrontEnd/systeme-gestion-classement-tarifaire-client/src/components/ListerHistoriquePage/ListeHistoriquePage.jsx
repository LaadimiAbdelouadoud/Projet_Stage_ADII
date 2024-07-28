import React, { useState, useEffect } from "react";
import api from "../../api.js";
import "./ListerHistoriquePage.css";
import Menu from "../Menu/Menu.jsx";
import EditIcon from '@mui/icons-material/Edit'; // Import MUI EditIcon
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ListerHistoriquePage = () => {
  const [formData, setFormData] = useState({
    idUtilisateur: null,
    idHistorique: null,
    numNote: null,
    dateDerniereModification: null,
  });

  const [historiques, setHistoriques] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const historiquesPerPage = 10;

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  useEffect(() => {
    // Fetch initial data or other necessary data here if needed
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value || null }));
  };

  const handleReset = () => {
    setFormData({
      idUtilisateur: null,
      idHistorique: null,
      numNote: null,
      dateDerniereModification: null,
    });
    setHistoriques([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      idUtilisateur: formData.idUtilisateur,
      idHistorique: formData.idHistorique,
      numNote: formData.numNote,
      dateDerniereModification: formData.dateDerniereModification,
    };

    api
      .post("http://localhost:8080/api/Decision/lister_historique", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setHistoriques(response.data);
        setMessage("Succes.");
        setMessageStatus("success");
      })
      .catch((error) => {
        console.error("There was an error fetching the historiques:", error);
        setMessage("erreur.");
        setMessageStatus("error");
      });
  };

  const indexOfLastHistorique = currentPage * historiquesPerPage;
  const indexOfFirstHistorique = indexOfLastHistorique - historiquesPerPage;
  const currentHistoriques = historiques.slice(indexOfFirstHistorique, indexOfLastHistorique);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <div className="listerHistorique-container">
        <form className="listerHistorique-form" onSubmit={handleSubmit}>
          <div className="listerHistorique-title">
            <h1>Lister Historique</h1>
          </div>

          {/* ID Utilisateur */}
          <div className="input-control">
            <label htmlFor="idUtilisateur">ID Utilisateur</label>
            <br />
            <input
              type="text"
              name="idUtilisateur"
              id="idUtilisateur"
              placeholder="ID Utilisateur"
              value={formData.idUtilisateur || ""}
              onChange={handleChange}
            />
          </div>

          {/* ID Historique */}
          <div className="input-control">
            <label htmlFor="idHistorique">ID Historique</label>
            <br />
            <input
              type="text"
              name="idHistorique"
              id="idHistorique"
              placeholder="ID Historique"
              value={formData.idHistorique || ""}
              onChange={handleChange}
            />
          </div>

          {/* Numéro de Note */}
          <div className="input-control">
            <label htmlFor="numNote">Numéro de Note</label>
            <br />
            <input
              type="text"
              name="numNote"
              id="numNote"
              placeholder="Numéro de Note"
              value={formData.numNote || ""}
              onChange={handleChange}
            />
          </div>

          {/* Date Dernière Modification */}
          <div className="input-control">
            <label htmlFor="dateDerniereModification">Date Dernière Modification</label>
            <br />
            <input
              type="date"
              name="dateDerniereModification"
              id="dateDerniereModification"
              value={formData.dateDerniereModification || ""}
              onChange={handleChange}
            />
          </div>

          <div className="submitButton">
            <button type="submit" className="valider">
              Valider
            </button>
            <button type="button" className="reinitialiser" onClick={handleReset}>
              Réinitialiser
            </button>
          </div>
          <div className={`message ${messageStatus}`}>{message}</div>
        </form>

        {historiques.length > 0 && (
          <div className="historiques-table">
            <table>
              <thead>
                <tr>
                  <th>ID Utilisateur</th>
                  <th>ID Historique</th>
                  <th>Numéro de Note</th>
                  <th>Date de Modification</th>
                  
                </tr>
              </thead>
              <tbody>
                {currentHistoriques.map((historique) => (
                  <tr key={historique.idHistorique}>
                    <td>{historique.utilisateur.idUtilisateur}</td>
                    <td>{historique.idHistorique}</td>
                    <td>{historique.decisionTarifaire.numNote}</td>
                    <td>{historique.dateDerniereModification}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: Math.ceil(historiques.length / historiquesPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListerHistoriquePage;
