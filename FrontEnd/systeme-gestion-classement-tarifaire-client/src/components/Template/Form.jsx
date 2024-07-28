import React, { useState } from 'react';
import './Form.css';
const MyForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    tel: '',
    situationFamiliale: '',
    sexe: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('neutral');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      dateNaissance: '',
      tel: '',
      situationFamiliale: '',
      sexe: '',
    });
    setFormErrors({});
    setFormStatus('neutral');
  };

  const validateField = (name, value) => {
    let error = '';
    let success = false;

    switch (name) {
      case 'nom':
        const nomExp = /^[A-Z]+$/;
        if (!value) {
          error = 'Veuillez saisir votre nom.';
        } else if (!nomExp.test(value)) {
          error = 'Forme non valide.';
        } else {
          success = true;
        }
        break;
      case 'prenom':
        const prenomExp = /^[A-Z][a-z]*$/;
        if (!value) {
          error = 'Veuillez saisir votre prénom.';
        } else if (!prenomExp.test(value)) {
          error = 'Forme non valide.';
        } else {
          success = true;
        }
        break;
      case 'email':
        const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          error = 'Veuillez saisir votre email.';
        } else if (!emailExp.test(value)) {
          error = 'Forme non valide.';
        } else {
          success = true;
        }
        break;
      case 'dateNaissance':
        const dateNaissanceExp = /^(200[0-5]|19[0-9]{2})-[0-9]{2}-[0-9]{2}$/;
        if (!value) {
          error = 'Veuillez saisir votre date de naissance.';
        } else if (!dateNaissanceExp.test(value)) {
          error = 'Seuls ceux qui sont né(e)s en(ou avant) 2005 sont accepté(e)s';
        } else {
          success = true;
        }
        break;
      case 'tel':
        const telExp = /^0[0-9]{9}$/;
        if (!value) {
          error = 'Veuillez saisir votre numéro de téléphone.';
        } else if (!telExp.test(value)) {
          error = 'Forme invalide.';
        } else {
          success = true;
        }
        break;
      case 'situationFamiliale':
        if (!value) {
          error = 'Veuillez sélectionner votre situation.';
        } else {
          success = true;
        }
        break;
      case 'sexe':
        if (!value) {
          error = 'Veuillez sélectionner votre sexe.';
        } else {
          success = true;
        }
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [name]: error });
    if (success) {
      setFormStatus('success');
    } else {
      setFormStatus('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(formData).every((val) => val);
    if (!isValid) {
      setFormStatus('error');
      Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    } else {
      setFormStatus('success');
      // Submit the form or further actions
    }
  };

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit}>
        <div className="title">
          <h1>Formulaire</h1>
        </div>

        {/* Nom */}
        <div className={`input-control ${formErrors.nom ? 'error' : formStatus}`}>
          <label htmlFor="nom">Nom</label><br />
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Ex: LAADIMI"
            value={formData.nom}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.nom}</div>
        </div>

        {/* Prenom */}
        <div className={`input-control ${formErrors.prenom ? 'error' : formStatus}`}>
          <label htmlFor="prenom">Prenom</label><br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            placeholder="Ex: Abdelouadoud"
            value={formData.prenom}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.prenom}</div>
        </div>

        {/* Email */}
        <div className={`input-control ${formErrors.email ? 'error' : formStatus}`}>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ex: abcdef@mail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.email}</div>
        </div>

        {/* Date de Naissance */}
        <div className={`input-control ${formErrors.dateNaissance ? 'error' : formStatus}`}>
          <label htmlFor="dateNaissance">Date de naissance</label><br />
          <input
            type="date"
            name="dateNaissance"
            id="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.dateNaissance}</div>
        </div>

        {/* Telephone */}
        <div className={`input-control ${formErrors.tel ? 'error' : formStatus}`}>
          <label htmlFor="tel">Telephone</label><br />
          <input
            type="text"
            name="tel"
            id="tel"
            placeholder="Ex: 0612345678"
            value={formData.tel}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.tel}</div>
        </div>

        {/* Situation familiale */}
        <div className={`input-control ${formErrors.situationFamiliale ? 'error' : formStatus}`}>
          <label for="situationFamiliale">Situation Familiale</label><br />

          <label htmlFor="celibataire">Celibataire</label>
          <input
            type="radio"
            name="situationFamiliale"
            id="celibataire"
            value="celibataire"
            checked={formData.situationFamiliale === 'celibataire'}
            onChange={handleChange}
          />

          <label htmlFor="Marie">Marie(e)</label>
          <input
            type="radio"
            name="situationFamiliale"
            id="Marie"
            value="Marié"
            checked={formData.situationFamiliale === 'Marié'}
            onChange={handleChange}
          />
          <div className="errorMessage">{formErrors.situationFamiliale}</div>
        </div>

        {/* Sexe */}
        <div className={`input-control ${formErrors.sexe ? 'error' : formStatus}`}>
          <label htmlFor="sexe">Sexe</label><br />
          <select
            id="sexe"
            name="sexe"
            value={formData.sexe}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
          <div className="errorMessage">{formErrors.sexe}</div>
        </div>

        {/* Valider/reinitialiser */}
        <div className="submitButton input-control neutral">
          <button type="submit" name="valider" id="valider">Valider</button>
          <button type="button" name="reinitialiser" id="reinitialiser" onClick={handleReset}>Réinitialiser</button>
          <div className="errorMessage"></div>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
