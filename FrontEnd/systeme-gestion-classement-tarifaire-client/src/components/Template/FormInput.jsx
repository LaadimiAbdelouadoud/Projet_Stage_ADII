import React from 'react';

const FormInput = ({ type, name, id, placeholder, value, onChange, onKeyUp, onBlur }) => {
  return (
    <div className="input-control neutral">
      <label htmlFor={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</label><br />
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
      />
      <div className="errorMessage"></div>
    </div>
  );
};

export default FormInput;
