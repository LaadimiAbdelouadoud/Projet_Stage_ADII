import React, { useState, useEffect } from "react";
import api from "../../api.js";
import "./ListerUtilisateursPage.css";
import Menu from "../Menu/Menu.jsx";
import EditIcon from '@mui/icons-material/Edit'; // Import MUI EditIcon
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ListerUtilisateursPage = () => {
  const [formData, setFormData] = useState({
    nom: null,
    idUtilisateur: null,
    structure: null,
    profile: {
      libele: null,
    },
  });

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [profileOptions, setProfileOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const utilisateursPerPage = 10;

  const structureOptions = [
    { id: 1, libele: "Departement1" },
    { id: 2, libele: "Departement2" },
    { id: 3, libele: "Departement3" },
    { id: 4, libele: "Departement4" },
  ];

  useEffect(() => {
    api
      .get("http://localhost:8080/api/administration/gestion_profile/lister_profile_actif")
      .then((response) => {
        setProfileOptions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile options:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profile") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile: { libele: value || null },
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value || null }));
    }
  };

  const handleReset = () => {
    setFormData({
      nom: null,
      idUtilisateur: null,
      structure: null,
      profile: {
        libele: null,
      },
    });
    setUtilisateurs([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      idUtilisateur: formData.idUtilisateur,
      nom: formData.nom,
      structure: formData.structure,
      profile: {
        libele: formData.profile.libele,
      },
    };

    api
      .post("http://localhost:8080/api/administration/gestion_utilisateur/lister_utilisateur", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setUtilisateurs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the utilisateurs:", error);
      });
  };

  const indexOfLastUtilisateur = currentPage * utilisateursPerPage;
  const indexOfFirstUtilisateur = indexOfLastUtilisateur - utilisateursPerPage;
  const currentUtilisateurs = utilisateurs.slice(indexOfFirstUtilisateur, indexOfLastUtilisateur);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <div className="listerUtilisateurs-container">
        
        <form className="listerUtilisateurs-form" onSubmit={handleSubmit}>
          <div className="listerUtilisateurs-title">
            <h1>Lister Utilisateurs</h1>
          </div>

          {/* Nom */}
          <div className="input-control">
            <label htmlFor="nom">Nom</label>
            <br />
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="NOM"
              value={formData.nom || ""}
              onChange={handleChange}
            />
          </div>

          {/* ID */}
          <div className="input-control">
            <label htmlFor="idUtilisateur">ID</label>
            <br />
            <input
              type="text"
              name="idUtilisateur"
              id="idUtilisateur"
              placeholder="ID"
              value={formData.idUtilisateur || ""}
              onChange={handleChange}
            />
          </div>

          {/* Structure */}
          <div className="input-control">
            <label htmlFor="structure">Structure</label>
            <br />
            <select
              name="structure"
              id="structure"
              value={formData.structure || ""}
              onChange={handleChange}
            >
              <option value="">Sélectionnez une structure</option>
              {structureOptions.map((option) => (
                <option key={option.id} value={option.libele}>
                  {option.libele}
                </option>
              ))}
            </select>
          </div>

          {/* Profile */}
          <div className="input-control">
            <label htmlFor="profile">Profile</label>
            <br />
            <select
              name="profile"
              id="profile"
              value={formData.profile.libele || ""}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un profile</option>
              {profileOptions.map((option) => (
                <option key={option.idProfile} value={option.libele}>
                  {option.libele}
                </option>
              ))}
            </select>
          </div>

          {/* Submit and Reset buttons */}
          <div className="submitButton">
            <button type="submit" className="valider">Soumettre</button>
            <button type="button" className="reinitialiser" onClick={handleReset}>Réinitialiser</button>
          </div>
        </form>

        {/* Utilisateurs Table */}
        <div className="utilisateurs-table">
          {utilisateurs.length > 0 && (
            <>
              <div className="message nombreResultats">Nombre de résultats: {utilisateurs.length}</div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Structure</th>
                    <th>Profile</th>
                    <th>Dernière Connexion</th>
                    <th>Actif</th>
                    <th>Modifier</th> {/* New column for edit button */}
                  </tr>
                </thead>
                <tbody>
                  {currentUtilisateurs.map((utilisateur) => (
                    <tr key={utilisateur.idUtilisateur}>
                      <td>{utilisateur.idUtilisateur}</td>
                      <td>{utilisateur.nom}</td>
                      <td>{utilisateur.prenom}</td>
                      <td>{utilisateur.email}</td>
                      <td>{utilisateur.structure}</td>
                      <td>{utilisateur.profile.libele}</td>
                      <td>{utilisateur.derniereConnection}</td>
                      <td>{utilisateur.actif ? "Oui" : "Non"}</td>
                      <td>
                        <Link to={`/ModifierUtilisateur/${utilisateur.idUtilisateur}`}>
                          <EditIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                {[...Array(Math.ceil(utilisateurs.length / utilisateursPerPage)).keys()].map((number) => (
                  <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? "active" : ""}>
                    {number + 1}
                  </button>
                ))}
                <button className="ajouter-button" onClick={()=>{window.location.href = "/AjoutUtilisateur";}}>Ajouter</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListerUtilisateursPage;
