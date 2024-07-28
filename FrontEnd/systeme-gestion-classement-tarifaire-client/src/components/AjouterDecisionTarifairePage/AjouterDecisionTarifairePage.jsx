import React, { useState } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import "./AjouterDecisionTarifairePage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AjouterDecisionTarifairePage = () => {
  const [formData, setFormData] = useState({
    numNote: "",
    libeleNote: "",
    codeTarifaire: "",
    dateDiffusion: "",
    decision: "",
    dateDecision: "",
    dateValidite: "",
    valide: false,
    conclusion: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReset = () => {
    setFormData({
      numNote: "",
      libeleNote: "",
      codeTarifaire: "",
      dateDiffusion: "",
      decision: "",
      dateDecision: "",
      dateValidite: "",
      valide: false,
      conclusion: "",
    });
    setMessage("");
    setMessageStatus("neutral");
    setFormErrors({});
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "numNote":
      case "libeleNote":
      case "codeTarifaire":
      case "dateDiffusion":
      case "decision":
      case "dateDecision":
      case "dateValidite":
      case "conclusion":
        if (!value) error = `Veuillez saisir ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNumNoteValid = validateField("numNote", formData.numNote);
    const isLibeleNoteValid = validateField("libeleNote", formData.libeleNote);
    const isCodeTarifaireValid = validateField("codeTarifaire", formData.codeTarifaire);
    const isDateDiffusionValid = validateField("dateDiffusion", formData.dateDiffusion);
    const isDecisionValid = validateField("decision", formData.decision);
    const isDateDecisionValid = validateField("dateDecision", formData.dateDecision);
    const isDateValiditeValid = validateField("dateValidite", formData.dateValidite);
    const isConclusionValid = validateField("conclusion", formData.conclusion);

    if (
      isNumNoteValid &&
      isLibeleNoteValid &&
      isCodeTarifaireValid &&
      isDateDiffusionValid &&
      isDecisionValid &&
      isDateDecisionValid &&
      isDateValiditeValid &&
      isConclusionValid
    ) {
      const transformedData = {
        numNote: formData.numNote,
        libeleNote: formData.libeleNote,
        codeTarifaire: formData.codeTarifaire,
        dateDiffusion: formData.dateDiffusion,
        decision: formData.decision,
        dateDecision: formData.dateDecision,
        dateValidite: formData.dateValidite,
        valide: formData.valide,
        conclusion: formData.conclusion,
      };

      console.log("Submitting data:", JSON.stringify(transformedData, null, 2));

      api
        .post(
          "http://localhost:8080/api/Decision/ajouter_decision",
          transformedData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
          setMessage("Ajout avec succès.");
          setMessageStatus("success");
          handleReset();
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage("Erreur lors de l'ajout de la décision tarifaire.");
          setMessageStatus("error");
        });
    } else {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="ajouterDecisionTarifaire-bouttonRetour">
        <button
          className="ajouter-button"
          onClick={() => {
            window.location.href = "/ListerDecisions";
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="ajouterDecisionTarifaire-container">
        <form className="ajouterDecisionTarifaire-form" onSubmit={handleSubmit}>
          <div className="ajouterDecisionTarifaire-title">
            <h1>Ajouter Décision Tarifaire</h1>
          </div>

          {/* Num Note */}
          <div className={`input-control ${formErrors.numNote ? "error" : ""}`}>
            <label htmlFor="numNote">Numéro de la Note</label>
            <br />
            <input
              type="text"
              name="numNote"
              id="numNote"
              placeholder="Numéro de la Note"
              value={formData.numNote}
              onChange={handleChange}
            />
            {formErrors.numNote && <div className="errorMessage">{formErrors.numNote}</div>}
          </div>

          {/* Libellé Note */}
          <div className={`input-control ${formErrors.libeleNote ? "error" : ""}`}>
            <label htmlFor="libeleNote">Libellé de la Note</label>
            <br />
            <input
              type="text"
              name="libeleNote"
              id="libeleNote"
              placeholder="Libellé de la Note"
              value={formData.libeleNote}
              onChange={handleChange}
            />
            {formErrors.libeleNote && <div className="errorMessage">{formErrors.libeleNote}</div>}
          </div>

          {/* Classement Tarifaire */}
          <div className={`input-control ${formErrors.codeTarifaire ? "error" : ""}`}>
            <label htmlFor="codeTarifaire">Classement Tarifaire</label>
            <br />
            <input
              type="text"
              name="codeTarifaire"
              id="codeTarifaire"
              placeholder="Classement Tarifaire"
              value={formData.codeTarifaire}
              onChange={handleChange}
            />
            {formErrors.codeTarifaire && <div className="errorMessage">{formErrors.codeTarifaire}</div>}
          </div>

          {/* Date de Diffusion */}
          <div className={`input-control ${formErrors.dateDiffusion ? "error" : ""}`}>
            <label htmlFor="dateDiffusion">Date de Diffusion</label>
            <br />
            <input
              type="date"
              name="dateDiffusion"
              id="dateDiffusion"
              value={formData.dateDiffusion}
              onChange={handleChange}
            />
            {formErrors.dateDiffusion && <div className="errorMessage">{formErrors.dateDiffusion}</div>}
          </div>

          {/* Décision */}
          <div className={`input-control ${formErrors.decision ? "error" : ""}`}>
            <label htmlFor="decision">Décision</label>
            <br />
            <textarea
              name="decision"
              id="decision"
              placeholder="Décision"
              value={formData.decision}
              onChange={handleChange}
            />
            {formErrors.decision && <div className="errorMessage">{formErrors.decision}</div>}
          </div>

          {/* Date de la Décision */}
          <div className={`input-control ${formErrors.dateDecision ? "error" : ""}`}>
            <label htmlFor="dateDecision">Date de la Décision</label>
            <br />
            <input
              type="date"
              name="dateDecision"
              id="dateDecision"
              value={formData.dateDecision}
              onChange={handleChange}
            />
            {formErrors.dateDecision && <div className="errorMessage">{formErrors.dateDecision}</div>}
          </div>

          {/* Date de Validité */}
          <div className={`input-control ${formErrors.dateValidite ? "error" : ""}`}>
            <label htmlFor="dateValidite">Date de Validité</label>
            <br />
            <input
              type="date"
              name="dateValidite"
              id="dateValidite"
              value={formData.dateValidite}
              onChange={handleChange}
            />
            {formErrors.dateValidite && <div className="errorMessage">{formErrors.dateValidite}</div>}
          </div>

          {/* Valide */}
          <div className={`input-control ${formErrors.valide ? "error" : ""}`}>
            <label htmlFor="valide">Valide</label>
            <br />
            <input
              type="checkbox"
              name="valide"
              id="valide"
              checked={formData.valide}
              onChange={handleChange}
            />
            {formErrors.valide && <div className="errorMessage">{formErrors.valide}</div>}
          </div>

          {/* Conclusion */}
          <div className={`input-control ${formErrors.conclusion ? "error" : ""}`}>
            <label htmlFor="conclusion">Conclusion</label>
            <br />
            <textarea
              name="conclusion"
              id="conclusion"
              placeholder="Conclusion"
              value={formData.conclusion}
              onChange={handleChange}
            />
            {formErrors.conclusion && <div className="errorMessage">{formErrors.conclusion}</div>}
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

export default AjouterDecisionTarifairePage;
