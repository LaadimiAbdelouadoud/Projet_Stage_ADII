import React, { useState, useEffect } from "react";
import api from "../../api.js";
import "./ListerDecisionTarifairePage.css";
import Menu from "../Menu/Menu.jsx";
import EditIcon from '@mui/icons-material/Edit'; // Import MUI EditIcon
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ListerDecisionTarifairePage = () => {
  const [codeTarifaire, setCodeTarifaire] = useState("");
  const [decisions, setDecisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const decisionsPerPage = 10;

  const handleChange = (e) => {
    setCodeTarifaire(e.target.value);
  };

  const handleReset = () => {
    setCodeTarifaire("");
    setDecisions([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace empty string with null
    const requestData = { codeTarifaire: codeTarifaire || null };

    console.log("Request Data:", JSON.stringify(requestData, null, 2));

    api
      .post("http://localhost:8080/api/Decision/lister_decision", requestData)
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
              value={codeTarifaire}
              onChange={handleChange}
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
                    <th>CodeTarifaire</th>
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
