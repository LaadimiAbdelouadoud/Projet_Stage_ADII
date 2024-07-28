import React, { useState, useEffect } from "react";
import api from "../../api.js"; // Import the configured Axios instance
import "./ModifierDecisionTarifairePage.css";
import Menu from "../Menu/Menu.jsx";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ModifierDecisionTarifairePage = () => {
  const { id } = useParams();
  const [decisionId, setDecisionId] = useState(id);

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
  const [fieldStatus, setFieldStatus] = useState({
    numNote: "neutral",
    libeleNote: "neutral",
    codeTarifaire: "neutral",
    dateDiffusion: "neutral",
    decision: "neutral",
    dateDecision: "neutral",
    dateValidite: "neutral",
    valide: "neutral",
    conclusion: "neutral",
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("neutral");

  useEffect(() => {
    // Fetch decision details for the given id
    if (id) {
      api
        .get(`http://localhost:8080/api/Decision/lister_decision/${id}`)
        .then((response) => {
          console.log(JSON.stringify(response.data,null,2));
          const {
            numNote,
            libeleNote,
            codeTarifaire,
            dateDiffusion,
            decision,
            dateDecision,
            dateValidite,
            valide,
            conclusion,
          } = response.data;
          setFormData({
            numNote: numNote || "",
            libeleNote: libeleNote || "",
            codeTarifaire: codeTarifaire || "",
            dateDiffusion: dateDiffusion || "",
            decision: decision || "",
            dateDecision: dateDecision || "",
            dateValidite: dateValidite || "",
            valide: valide || false,
            conclusion: conclusion || "",
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the decision details:", error);
        });
        console.log(JSON.stringify(formData,null,2));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    validateField(name, checked);
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
    setFieldStatus({
      numNote: "neutral",
      libeleNote: "neutral",
      codeTarifaire: "neutral",
      dateDiffusion: "neutral",
      decision: "neutral",
      dateDecision: "neutral",
      dateValidite: "neutral",
      valide: "neutral",
      conclusion: "neutral",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let status = "neutral";

    switch (name) {
      case "numNote":
        if (!value) {
          error = "Veuillez saisir le numéro de note.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "libeleNote":
        if (!value) {
          error = "Veuillez saisir le libellé de la note.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "codeTarifaire":
        if (!value) {
          error = "Veuillez saisir le classement tarifaire.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "dateDiffusion":
        if (!value) {
          error = "Veuillez saisir la date de diffusion.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "decision":
        if (!value) {
          error = "Veuillez saisir la décision.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "dateDecision":
        if (!value) {
          error = "Veuillez saisir la date de la décision.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "dateValidite":
        if (!value) {
          error = "Veuillez saisir la date de validité.";
          status = "error";
        } else {
          status = "success";
        }
        break;

      case "conclusion":
        if (!value) {
          error = "Veuillez saisir la conclusion.";
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

    // Validation checks
    const isNumNoteValid = validateField("numNote", formData.numNote);
    const isLibeleNoteValid = validateField("libeleNote", formData.libeleNote);
    const iscodeTarifaireValid = validateField("codeTarifaire", formData.codeTarifaire);
    const isDateDiffusionValid = validateField("dateDiffusion", formData.dateDiffusion);
    const isDecisionValid = validateField("decision", formData.decision);
    const isDateDecisionValid = validateField("dateDecision", formData.dateDecision);
    const isDateValiditeValid = validateField("dateValidite", formData.dateValidite);
    const isValideValid = validateField("valide", formData.valide);
    const isConclusionValid = validateField("conclusion", formData.conclusion);

    if (
      isNumNoteValid &&
      isLibeleNoteValid &&
      iscodeTarifaireValid &&
      isDateDiffusionValid &&
      isDecisionValid &&
      isDateDecisionValid &&
      isDateValiditeValid &&
      isValideValid &&
      isConclusionValid
    ) {
      const updatedData = {
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

      api
        .put(`http://localhost:8080/api/Decision/modifier_decision/${decisionId}`, updatedData)
        .then((response) => {
          console.log("Decision updated successfully:", response.data);
          setMessage("Decision modifiée avec succès.");
          setMessageStatus("success");
        })
        .catch((error) => {
          console.error("Error updating decision:", error);
          setMessage("Erreur lors de la modification de la décision.");
          setMessageStatus("error");
        });
    } else {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setMessageStatus("error");
    }
  };

  return (
    <>
      <div className="modifierDecisionTarifaire-bouttonRetour">
        <button
          className="modifier-button"
          onClick={() => {
            window.location.href = "/ListerDecisions";
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="modifierDecisionTarifaire-container">
        <form className="modifierDecisionTarifaire-form" onSubmit={handleSubmit}>
          <div className="modifierDecisionTarifaire-title">
            <h1>Modifier Decision Tarifaire</h1>
          </div>


          {/* Numéro de Note */}
          <div className={`input-control ${fieldStatus.numNote}`}>
            <label id="numNote-label" htmlFor="numNote">Numéro de Note</label>
            <br />
            <input
              type="text"
              name="numNote"
              id="numNote"
              value={formData.numNote}
              onChange={handleChange}
              disabled
            />
            <div className="errorMessage">{formErrors.numNote}</div>
          </div>

          {/* Libellé de la Note */}
          <div className={`input-control ${fieldStatus.libeleNote}`}>
            <label htmlFor="libeleNote">Libellé de la Note</label>
            <br />
            <input
              type="text"
              name="libeleNote"
              id="libeleNote"
              value={formData.libeleNote}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.libeleNote}</div>
          </div>

          {/* Classement Tarifaire */}
          <div className={`input-control ${fieldStatus.codeTarifaire}`}>
            <label htmlFor="codeTarifaire">Code Tarifaire</label>
            <br />
            <input
              type="text"
              name="codeTarifaire"
              id="codeTarifaire"
              value={formData.codeTarifaire}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.codeTarifaire}</div>
          </div>

          {/* Date de Diffusion */}
          <div className={`input-control ${fieldStatus.dateDiffusion}`}>
            <label htmlFor="dateDiffusion">Date de Diffusion</label>
            <br />
            <input
              type="date"
              name="dateDiffusion"
              id="dateDiffusion"
              value={formData.dateDiffusion}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.dateDiffusion}</div>
          </div>

          {/* Decision */}
          <div className={`input-control ${fieldStatus.decision}`}>
            <label htmlFor="decision">Decision</label>
            <br />
            <input
              type="text"
              name="decision"
              id="decision"
              value={formData.decision}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.decision}</div>
          </div>

          {/* Date de Decision */}
          <div className={`input-control ${fieldStatus.dateDecision}`}>
            <label htmlFor="dateDecision">Date de Decision</label>
            <br />
            <input
              type="date"
              name="dateDecision"
              id="dateDecision"
              value={formData.dateDecision}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.dateDecision}</div>
          </div>

          {/* Date de Validité */}
          <div className={`input-control ${fieldStatus.dateValidite}`}>
            <label htmlFor="dateValidite">Date de Validité</label>
            <br />
            <input
              type="date"
              name="dateValidite"
              id="dateValidite"
              value={formData.dateValidite}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.dateValidite}</div>
          </div>

          {/* Valide */}
          <div className={`input-control ${fieldStatus.valide}`}>
            <label htmlFor="valide">Valide</label>
            <input
              type="checkbox"
              name="valide"
              id="valide"
              checked={formData.valide}
              onChange={handleToggleChange}
            />
            <div className="errorMessage">{formErrors.valide}</div>
          </div>

          {/* Conclusion */}
          <div className={`input-control ${fieldStatus.conclusion}`}>
            <label htmlFor="conclusion">Conclusion</label>
            <br />
            <input
              type="text"
              name="conclusion"
              id="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
            />
            <div className="errorMessage">{formErrors.conclusion}</div>
          </div>

          {/* Submit Button */}
          <div className="submitButton">
            <button className="valider" type="submit">Modifier</button>
            <button className="reinitialiser" type="button" onClick={handleReset}>
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

export default ModifierDecisionTarifairePage;
