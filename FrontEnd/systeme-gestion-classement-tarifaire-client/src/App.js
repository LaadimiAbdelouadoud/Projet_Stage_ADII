import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageAccueil from "./components/Accueil/PageAccueil";
import LoginPage from "./components/Login/LoginPage";
import Menu from "./components/Menu/Menu";
import AjoutUtilisateurPage from "./components/AjoutUtilisateurPage/AjoutUtilisateurPage";
import PagePrincipale from './components/PagePrincipale/PagePrincipale'
import ListerUtilisateursPage from "./components/ListerUtilisateurs/ListerUtilisateursPage";
import ModifierUtilisateurPage from "./components/ModifierUtilisateur/ModifierUtilisateurPage";
import ListerProfilesPage from "./components/ListerProfilles/ListerProfilesPage";
import AjoutProfilesPage from "./components/AjoutProfilePage/AjoutProfilesPage";
import ModifierProfilePage from "./components/ModifierProfile/ModifierProfilePage";
import ListerDecisionTarifairePage from "./components/ListerDecisionsTarifaires/ListerDecisionTarifairePage";
import AjouterDecisionTarifairePage from "./components/AjouterDecisionTarifairePage/AjouterDecisionTarifairePage";
import ModifierDecisionTarifairePage from "./components/ModifierDecisionTarifairePage/ModifierDecisionTarifairePage";
import ListerHistoriquePage from "./components/ListerHistoriquePage/ListeHistoriquePage";
import PasswordResetPage from "./components/PasswordResetPage/PasswordResetPage";
import RequestPasswordResetPage from "./components/RequestPasswordResetPage/RequestPasswordResetPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/AjoutUtilisateur" element={<AjoutUtilisateurPage />} />
          <Route path="/PagePrincipale" element={<PagePrincipale />}/>
          <Route path="/ListerUtilisateurs" element={<ListerUtilisateursPage />}/>
          <Route path="/ModifierUtilisateur/:id" element={<ModifierUtilisateurPage />} />
          <Route path="/ListerProfiles" element={<ListerProfilesPage/>}/>
          <Route path="/AjoutProfiles" element={<AjoutProfilesPage/>}/>
          <Route path="/ModifierProfile/:id" element={<ModifierProfilePage/>}/>
          <Route path="/ListerDecisions" element={<ListerDecisionTarifairePage/>}/>
          <Route path="/AjouterDecision" element={<AjouterDecisionTarifairePage/>}/>
          <Route path="/ModifierDecision/:id" element={<ModifierDecisionTarifairePage/>}/>   
          <Route path="/ListerHitorique" element={<ListerHistoriquePage/>}/>
          <Route path="/request-password-reset" element={<RequestPasswordResetPage/>} />
          <Route path="/password-reset/:token" element={<PasswordResetPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
