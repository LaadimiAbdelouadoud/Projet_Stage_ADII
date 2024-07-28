import React, { useState, useEffect } from "react";
import api from "../../api.js";
import "./ListerProfilesPage.css";
import Menu from "../Menu/Menu.jsx";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ListerProfilesPage = () => {
  const [formData, setFormData] = useState({
    libele: null,
    idProfile: null,
  });

  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      libele: null,
      idProfile: null,
    });
    setProfiles([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("http://localhost:8080/api/administration/gestion_profile/lister_profile", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profiles:", error);
      });
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Menu />
      <div className="listerProfiles-container">
        
        <form className="listerProfiles-form" onSubmit={handleSubmit}>
          <div className="listerProfiles-title">
            <h1>Lister Profiles</h1>
          </div>

          {/* Libele */}
          <div className="input-control">
            <label htmlFor="libele">Libele</label>
            <br />
            <input
              type="text"
              name="libele"
              id="libele"
              placeholder="Libele"
              value={formData.libele || ""}
              onChange={handleChange}
            />
          </div>

          {/* ID Profile */}
          <div className="input-control">
            <label htmlFor="idProfile">ID Profile</label>
            <br />
            <input
              type="text"
              name="idProfile"
              id="idProfile"
              placeholder="ID Profile"
              value={formData.idProfile || ""}
              onChange={handleChange}
            />
          </div>

          {/* Submit and Reset buttons */}
          <div className="submitButton">
            <button type="submit" className="valider">Soumettre</button>
            <button type="button" className="reinitialiser" onClick={handleReset}>Réinitialiser</button>
          </div>
        </form>

        {/* Profiles Table */}
        <div className="profiles-table">
          {profiles.length > 0 && (
            <>
              <div className="message nombreResultats">Nombre de résultats: {profiles.length}</div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Libele</th>
                    <th>Description</th>
                    <th>Actif</th>
                    <th>Modifier</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfiles.map((profile) => (
                    <tr key={profile.idProfile}>
                      <td>{profile.idProfile}</td>
                      <td>{profile.libele}</td>
                      <td>{profile.description}</td>
                      <td>{profile.actif ? "Oui" : "Non"}</td>
                      <td>
                        <Link to={`/ModifierProfile/${profile.idProfile}`}>
                          <EditIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                {[...Array(Math.ceil(profiles.length / profilesPerPage)).keys()].map((number) => (
                  <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? "active" : ""}>
                    {number + 1}
                  </button>
                ))}
                <button className="ajouter-button" onClick={()=>{window.location.href = "/AjoutProfiles"}}>Ajouter</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListerProfilesPage;
