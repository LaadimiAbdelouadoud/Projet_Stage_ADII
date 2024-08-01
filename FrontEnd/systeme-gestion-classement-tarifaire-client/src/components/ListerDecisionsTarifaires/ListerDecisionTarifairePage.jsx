import React, { useState } from "react";
import api from "../../api.js";
import "./ListerDecisionTarifairePage.css";
import Menu from "../Menu/Menu.jsx";
import EditIcon from '@mui/icons-material/Edit'; 
import { Link } from "react-router-dom"; 

const ListerDecisionTarifairePage = () => {
  const [formData, setFormData] = useState({
    codeTarifaire: "",
    numNote: "",
    libeleNote: "",
    dateDecision: "",
    dateValidite: ""
  });
  const [motCle, setMotCle] = useState("");
  const [decisions, setDecisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const decisionsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMotCleChange = (e) => {
    setMotCle(e.target.value);
  };

  const handleReset = () => {
    setFormData({
      codeTarifaire: "",
      numNote: "",
      libeleNote: "",
      dateDecision: "",
      dateValidite: ""
    });
    setMotCle("");
    setDecisions([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const decisionTarifaire = {
      codeTarifaire: formData.codeTarifaire || null,
      numNote: formData.numNote || null,
      libeleNote: formData.libeleNote || null,
      dateDecision: formData.dateDecision || null,
      dateValidite: formData.dateValidite || null
    };

    const formattedRequestBody = {
      decisionTarifaire,
      motCle: motCle || null
    };

    console.log("Request Data:", JSON.stringify(formattedRequestBody, null, 2));

    api
      .post("http://localhost:8080/api/Decision/lister_decision", formattedRequestBody)
      .then((response) => {
        setDecisions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the decisions:", error);
      });
  };

  const indexOfLastDecision = currentPage * decisionsPerPage;
  const indexOfFirstDecision = indexOfLastDecision - decisionsPerPage;
  const currentDecisions = decisions.slice(indexOfFirstDecision, indexOfLastDecision);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <div className="listerDecisions-container">
        <form className="listerDecisions-form" onSubmit={handleSubmit}>
          <div className="listerDecisions-title">
            <h1>Lister Decisions Tarifaires</h1>
          </div>

          <div className="input-control">
            <label htmlFor="codeTarifaire">Code Tarifaire</label>
            <br />
            <input
              type="text"
              name="codeTarifaire"
              id="codeTarifaire"
              placeholder="Code Tarifaire"
              value={formData.codeTarifaire}
              onChange={handleChange}
            />
          </div>

          <div className="input-control">
            <label htmlFor="numNote">Num Note</label>
            <br />
            <input
              type="text"
              name="numNote"
              id="numNote"
              placeholder="Num Note"
              value={formData.numNote}
              onChange={handleChange}
            />
          </div>

          <div className="input-control">
            <label htmlFor="libeleNote">Libele Note</label>
            <br />
            <input
              type="text"
              name="libeleNote"
              id="libeleNote"
              placeholder="Libele Note"
              value={formData.libeleNote}
              onChange={handleChange}
            />
          </div>

          <div className="input-control">
            <label htmlFor="dateDecision">Date Decision</label>
            <br />
            <input
              type="date"
              name="dateDecision"
              id="dateDecision"
              value={formData.dateDecision}
              onChange={handleChange}
            />
          </div>

          <div className="input-control">
            <label htmlFor="dateValidite">Date Validite</label>
            <br />
            <input
              type="date"
              name="dateValidite"
              id="dateValidite"
              value={formData.dateValidite}
              onChange={handleChange}
            />
          </div>

          <div className="input-control">
            <label htmlFor="motCle">Mot Clé</label>
            <br />
            <input
              type="text"
              name="motCle"
              id="motCle"
              placeholder="Mot Clé"
              value={motCle}
              onChange={handleMotCleChange}
            />
          </div>

          <div className="submitButton">
            <button type="submit" className="valider">Soumettre</button>
            <button type="button" className="reinitialiser" onClick={handleReset}>Réinitialiser</button>
          </div>
        </form>

        <div className="decisions-table">
          {decisions.length > 0 && (
            <>
              <div className="message nombreResultats">Nombre de résultats: {decisions.length}</div>
              <table>
                <thead>
                  <tr>
                    <th>Num Note</th>
                    <th>Libele Note</th>
                    <th>Code Tarifaire</th>
                    <th>Date Diffusion</th>
                    <th>Decision</th>
                    <th>Date Decision</th>
                    <th>Date Validite</th>
                    <th>Conclusion</th>
                    <th>Valide</th>
                    <th>Modifier</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDecisions.map((decision) => (
                    <tr key={decision.numNote}>
                      <td>{decision.numNote}</td>
                      <td>{decision.libeleNote}</td>
                      <td>{decision.codeTarifaire}</td>
                      <td>{decision.dateDiffusion}</td>
                      <td>{decision.decision}</td>
                      <td>{decision.dateDecision}</td>
                      <td>{decision.dateValidite}</td>
                      <td>{decision.conclusion}</td>
                      <td>{decision.valide ? "Oui" : "Non"}</td>
                      <td>
                        <Link to={`/ModifierDecision/${decision.numNote}`}>
                          <EditIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                {[...Array(Math.ceil(decisions.length / decisionsPerPage)).keys()].map((number) => (
                  <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? "active" : ""}>
                    {number + 1}
                  </button>
                ))}
                <button className="ajouter-button" onClick={() => window.location.href = "/AjouterDecision"}>Ajouter</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListerDecisionTarifairePage;
