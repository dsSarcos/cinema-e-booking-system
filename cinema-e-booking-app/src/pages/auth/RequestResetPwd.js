import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import './RequestResetPwd.css';
//import { useGlobalContext } from '../../shared/context/GlobalContext';

const RequestResetPwd = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState(Math.random().toString(36).slice(-8));
  const [password, setPassword] = useState('1234');
  //const [confirmNum, setConfirmNum] = useState('');

  var temp = password;

  const submit = (e) => {
    sendEmail(e);
    e.preventDefault();

    console.log(password); // remove after fixing email

    sessionStorage.setItem("pass", password);
    sessionStorage.setItem("email", email);
    navigate('/reset-pwd');
  }

  const form = useRef();

  const updatePassword = () => {

    const payload = { Password: password, Email: email }

    fetch('http://localhost:3000/api/users/update/password', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(result => result.json())
      .then(result => {
        // Successfully changed password
        if (result.success === true) {
          console.log("Temporary password sent")
        } else { // failed to change password
          console.log("Failed to send temporary password")
        }
      })
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_k6dabce', 'template_berkymy', form.current, '0er0bBBCpFj1Shg8e')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="panel-container" id="reset-password-container">
      <form className="password-reset-email-form" onSubmit={submit} ref={form}>
      <div id="password-reset-info">
        <br/>
        <p>A confirmation code email will be sent to reset your password.</p>
      </div>
        <hr/>
        <label className="password-reset-field-header" htmlFor="name"><h3>Email Address</h3></label>
        <input className="text-field" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="user@gmail.com" id="email" name="email"></input>
        <br />
        <hr />
        <button className="create-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RequestResetPwd;