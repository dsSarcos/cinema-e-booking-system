import React, { useState } from 'react';
import './ResetPwd.css';
//import { authenticateUser } from '../api/api';
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { useNavigate } from "react-router-dom";

const ResetPwd = () => {

  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  //const [authenticated, setAuthenticated] = useState(false);
  //const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    updatePassword();
  }

  const updatePassword = async () => {
    /*
    setAuthenticated(true);
    authenticateUser(email, currentPassword).then(user => {
      // Check is user = {} which means authentication failed
      if (Object.keys(user).length === 0) {
        setPasswordErrorMsg("Please enter the temporary password sent to your email.");
        setAuthenticated(false);
      } else { // user has valid login
        setAuthenticated(true);
        setTemp(user)
        console.log("Valid current password.");
      }
    })
    // check if current password is correct, if not leave
    if (authenticated === false) {
      return;
    }

    */
    if (sessionStorage.getItem("pass") !== currentPassword) {
      setPasswordErrorMsg("Please enter the temporary password sent to your email.");
      return;
    }

    if (confirmNewPassword !== newPassword) {
      setPasswordErrorMsg("Passwords do not match");
      return;
    }

    const payload = { Password: newPassword, Email: sessionStorage.getItem("email") }

    fetch('http://localhost:3000/api/users/update/password', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(result => result.json())
      .then(result => {
        // Successfully changed password
        if (result.success === true) {
          console.log("Successfully changed password")
        } else { // failed to change password
          console.log("Failed to change password")
        }
      })

    // Set to null to hide error message
    setPasswordErrorMsg(null);
    setConfirmNewPassword('');
    setNewPassword('');
    //setUser(temp)
    sessionStorage.removeItem("pass");
    sessionStorage.removeItem("email")
    navigate("/")
  }

  const changePassword = (
    <div id="column-container">
      <div id="column-title">Reset Password</div>
      <hr />
      {passwordErrorMsg && <p style={{ color: "red" }}>{passwordErrorMsg}</p>}
      <label id="text-label" htmlFor="currentPassword">Temporary Password</label>
      <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="currentPassword"
        placeholder="*************" id="input-field" name="currentPassword" />
      <label id="text-label" htmlFor="newPassword">New Password</label>
      <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="newPassword"
        placeholder="*************" id="input-field" name="newPassword" />
      <label id="text-label" htmlFor="confirmNewPassword">Confirm Password</label>
      <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="confirmNewPassword" placeholder="*************" id="input-field"
        name="confirmNewPassword" />
      <button id="reset-password-button" type="submit">Update Password</button>
    </div>
  )

  return (
    <div className="home-container">
      <form className="password-reset-form" onSubmit={submit}>
        <hr></hr>
        <div id="page-container">
          <div>
            {changePassword}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPwd;