import React, { useState, useRef } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import emailjs from '@emailjs/browser';
import './Register.css';

const Register = () => {

  const [checked, setChecked] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    LastName: "",
    FirstName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    IsRegistered: ""
  });

  const [password, setPassword] = useState({
    Password: "",
    ConfirmPassword: ""
  })

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked === true) {
      setNewUserInfo((prevState) => ({
        ...prevState,
        IsRegistered: 1,
      }));
    } else {
      setNewUserInfo((prevState) => ({
        ...prevState,
        IsRegistered: 0,
      }));
    }
  };

  const [paymentInfo, setPaymentInfo] = useState({
    BillingAddr: "",
    BillingCity: "",
    BillingState: "",
    BillingZip: "",
    CardNumber1: "",
    ExpMonth1: "",
    ExpYear1: "",
    CardNumber2: "",
    ExpMonth2: "",
    ExpYear2: "",
    CardNumber3: "",
    ExpMonth3: "",
    ExpYear3: ""
  });

  const submit = (e) => {
    if (password.Password === password.ConfirmPassword && password.Password.length > 0) {
      setNewUserInfo({ ... newUserInfo, password: password.Password})
      sendEmail(e);
      e.preventDefault();
      console.log(newUserInfo.FirstName);

      fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserInfo)
      }).then(() => {
        console.log('new user added');
      })

      fetch('http://localhost:3000/api/paymentInfo/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo)
      }).then(() => {
        console.log('new payment added');
      })
    } else {
      e.preventDefault();
      setUserErrorMessage("Password Mismatch.");
    }
  }

  const handleUserChange = (event) => {
    setNewUserInfo({ ...newUserInfo, [event.target.name]: event.target.value });
  };

  const handlePaymentChange = (event) => {
    setPaymentInfo({ ...paymentInfo, [event.target.name]: event.target.value });
  };

  const handlePassword = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const handleShowButton = (event) => {
    setShowButton(true);
  }

  const form = useRef();

  const sendEmail = (e) => {
    console.log(newUserInfo.Email);
    e.preventDefault();
    /*
    emailjs.sendForm('service_igacmqk', 'template_bgjl92f', form.current, 'Af-MFx6Rz7TF52rGU')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });*/
  };


  return (
    <div className="registration-container">
      <div className="panel-container">
      <form className="register-form" onSubmit={submit} ref={form}>
        <label className="nameHeader" htmlFor="name">FIRST NAME</label>
        <input className="register-text-field" value={newUserInfo.FirstName} onChange={handleUserChange} type="firstName" placeholder="First Name" id="firstName" name="FirstName" />
        <label className="nameHeader" htmlFor="name">LAST NAME</label>
        <input className="register-text-field" value={newUserInfo.LastName} onChange={handleUserChange} type="lastName" placeholder="Last Name" id="lastName" name="LastName" />
        <label className="emailHeader" htmlFor="email">EMAIL</label>
        <input className="register-text-field" value={newUserInfo.Email} onChange={handleUserChange} type="email" placeholder="Email" id="email" name="Email" />
        <label className="phoneNumHeader" htmlFor="phoneNum">PHONE NUMBER</label>
        <input className="register-text-field" value={newUserInfo.PhoneNumber} onChange={handleUserChange} type="phoneNum" placeholder="+1(123) 456-7890" id="phoneNum" name="PhoneNumber" />
        <label className="passwordHeader" htmlFor="password">PASSWORD</label>
        <input className="register-text-field" value={password.Password} onChange={handlePassword} type="password" placeholder="Password" id="password" name="Password" />
        <label className="passwordHeader" htmlFor="confirmpassword">CONFIRM PASSWORD</label>
        <input className="register-text-field" value={password.ConfirmPassword} onChange={handlePassword} type="password" placeholder="Password" id="password" name="ConfirmPassword" />
        <div id="login-error">
                {userErrorMessage && userErrorMessage === "Password Mismatch." ?
                        <p style={{ color: "red" }}>{userErrorMessage}</p> :
                        <p style={{ color: "red" }}>{userErrorMessage}</p>
                }
            </div>
        <hr id="separator"/>
        <label className="optionalHeader">Optional</label>
        <label className="cardNumHeader" htmlFor="cardNum">Card Number</label>
        <input className="register-text-field" value={paymentInfo.CardNumber1} onChange={handlePaymentChange} type="cardNum" placeholder="1234 5678 9012 3456" id="cardNum" name="CardNumber1" />
        <label className="expireDateHeader" htmlFor="expireDateNum">Expiration Date</label>
        <div className="expire">
          <label className="month" htmlFor="month">Month</label>
          <select className="register-text-field" name="ExpMonth1" id="expireMonth" value={paymentInfo.ExpMonth1} onChange={handlePaymentChange}>
            <option value='01'>January</option>
            <option value='02'>February</option>
            <option value='03'>March</option>
            <option value='04'>April</option>
            <option value='05'>May</option>
            <option value='06'>June</option>
            <option value='07'>July</option>
            <option value='08'>August</option>
            <option value='09'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>

          <label className="year" htmlFor="year">Year</label>
          <select className="text-field" name="ExpYear1" id="expireYear" value={paymentInfo.ExpYear1} onChange={handlePaymentChange}>
            <option value='23'>2023</option>
            <option value='24'>2024</option>
            <option value='25'>2025</option>
            <option value='26'>2026</option>
            <option value='27'>2027</option>
            <option value='28'>2028</option>
            <option value='29'>2029</option>
            <option value='30'>2030</option>
          </select>
        </div>

        <label className="billingAddy" htmlFor="billingAddy">Billing Address</label>
        <input className="register-text-field" value={paymentInfo.BillingAddr} onChange={handlePaymentChange} type="billingAddy" placeholder="1234 Main Street" id="billingAddy" name="BillingAddr" />
        {/*<label className="homeAddyHeader" htmlFor="homeAddyInfo">Home Address</label>*/}
        {/*<label className="street" htmlFor="street">Street</label>*/}
        {/*<input className="text-field" value={street} onChange={handlePaymentChange} type="street" placeholder="1234 Main Street" id="street" name="street"/>*/}
        <label className="city" htmlFor="city">City</label>
        <input className="register-text-field" value={paymentInfo.BillingCity} onChange={handlePaymentChange} type="city" placeholder="Athens" id="city" name="BillingCity" />
        <label className="state" htmlFor="state">State</label>
        <input className="register-text-field" value={paymentInfo.BillingState} onChange={handlePaymentChange} type="state" placeholder="GA" id="state" name="BillingState" />
        <label className="zipCode" htmlFor="zipCode">Zip Code</label>
        <input className="register-text-field" value={paymentInfo.BillingZip} onChange={handlePaymentChange} type="zipCode" placeholder="30609" id="zipCode" name="BillingZip" />

        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Subscribe to Promotions" checked={checked} onChange={handleChange}/>
        </FormGroup>


        {/* Email does not work when button placed inside of Link router */}
        <button className="create-button" type="submit" onClick={handleShowButton}>Create Account</button>
        {showButton &&
          (
            <Link to={'/confirmation'} state={ { newUserInfo } }>
              <button className="create-button">Continue</button>
            </Link>
          )
        }
      </form>
    </div>
    </div>
  );
}

export default Register;