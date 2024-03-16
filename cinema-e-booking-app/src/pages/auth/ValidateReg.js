import React from 'react';
import { NavLink, Link } from "react-router-dom";
import './ValidateReg.css';

const ValidateReg = () => {

  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="auth-container">
      <div className="panel-container">
        <form className="validate-form" onSubmit={submit}>
          <h1>Thank you!</h1>
          <hr></hr>
          <h2>Account registered successfully!</h2>
        </form>

        <Link to="/Login">
          <button id="validate-login-button">Login</button>
        </Link>
      </div>
    </div>
    
  );
}

export default ValidateReg;