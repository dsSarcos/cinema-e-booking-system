import React, { useEffect, useState, useRef } from 'react';
import './Account.css';
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { getPaymentInfo, authenticateUser } from "../api/api";
import {Link} from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import emailjs from '@emailjs/browser';
import { jsx } from '@emotion/react';
import OrderOverlay from "../../shared/components/OrderOverlay/OrderOverlay";

const Account = () => {

  const { user } = useGlobalContext();

  const [updatingUser, setUpdatingUser] = useState(user);
  const [paymentInfo, setPaymentInfo]= useState({
    HomeAddr: "",
    HomeCity: "",
    HomeState: "",
    HomeZip: "",
    BillingAddr1: "",
    BillingCity1: "",
    BillingState1: "",
    BillingZip1: "",
    BillingAddr2: "",
    BillingCity2: "",
    BillingState2: "",
    BillingZip2: "",
    BillingAddr3: "",
    BillingCity3: "",
    BillingState3: "",
    BillingZip3: "",
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
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(updatingUser.IsRegistered);
  // const [isRegistered, setIsRegistered] = useState(updatingUser.IsRegistered);
  const [displayOverlay, setDisplayOverlay] = useState(false);

  // const [cardList, setCardList] = useState([]);

  const iter = Array.from({length: 3}, (_, i) => i + 1); // Fancy iterator for clean looping in DOM

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked === true) {
        setUpdatingUser({ ...updatingUser, [event.target.name]: 1 });
    } else {
        setUpdatingUser({ ...updatingUser, [event.target.name]: 0 });
    }
  };

  const handleUserChange = (event) => {
    setUpdatingUser({ ...updatingUser, [event.target.name]: event.target.value });
  };

  const handlePaymentChange = (event) => {
    setPaymentInfo({ ...paymentInfo, [event.target.name]: event.target.value });
  };

  const overlayHandler = () => {
    setDisplayOverlay((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.body.classList.add('no-scroll'); // Add CSS class to body
      } else {
        document.body.classList.remove('no-scroll'); // Remove CSS class from body
      }
      return newState;
    });
  };
  // const handlePaymentChange = (event) => {
  //   const { name, value } = event.target; // Extract the name and value from the input element
  //   setPaymentInfo(prevPaymentInfo => ({
  //     ...prevPaymentInfo,
  //     [name]: value // Update the corresponding property in the paymentInfo object
  //   }));
  // };

  const updatePassword = async () => {
    setAuthenticated(true);
    authenticateUser(user.Email, currentPassword).then(user => {
      // Check is user = {} which means authentication failed
      if (Object.keys(user).length === 0) {
        setPasswordErrorMsg("Please enter your current password.");
        setAuthenticated(false);
      } else { // user has valid login
        setAuthenticated(true);
        console.log("Valid current password.");
      }
    })
    // check if current password is correct, if not leave
    if (authenticated === false) {
      return;
    }

    if (confirmNewPassword !== newPassword) {
      setPasswordErrorMsg("Passwords do not match");
      return;
    }

    const payload = { Password: newPassword, Email: user.Email }

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
  }

  // const appendFull = (e) => {
  //   if (Object.keys(e).length > 0){
  //     // setCardList(cardList.push({list}.list));
  //     let temp = cardList;
  //     temp.push(e);
  //     setCardList(temp);
  //   }
  // }

  // get Payment Info and set
  useEffect(() => {
    getPaymentInfo(user.ID).then((paymentInfo) => {
      console.log('PaymentInfo set.' + JSON.stringify(paymentInfo));
      setPaymentInfo(paymentInfo);
    })
  }, [user]);

  const submit = (e) => {
    //sendEmail(e);
    e.preventDefault();
    fetch('http://localhost:3000/api/users/update/personal_info', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatingUser)
    }).then(() => {
      console.log('user updated');
    })

    fetch('http://localhost:3000/api/paymentInfo/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentInfo)
    }).then(() => {
      console.log('user payment info updated');
    })
  }

  const deletePaymentInfo = (idx) => {

    var temp = paymentInfo;
    temp[`CardNumber${idx}`] = null;
    temp[`ExpMonth${idx}`] = null;
    temp[`ExpYear${idx}`] = null;
    temp[`BillingAddr1${idx}`] = null;
    temp[`BillingCity${idx}`] = null;
    temp[`BillingState${idx}`] = null;
    temp[`BillingZip${idx}`] = null;

    fetch('http://localhost:3000/api/paymentInfo/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp)
    }).then(() => {
      console.log('user payment info updated');
    }).then(() => {
      getPaymentInfo(user.ID).then((paymentInfo) => {
        console.log('PaymentInfo set.' + JSON.stringify(paymentInfo));
        setPaymentInfo(paymentInfo);
      })
    })
  }

  const addPaymentInfo = (idx) => {
    
    var temp = paymentInfo;
    temp[`CardNumber${idx}`] = "";
    temp[`ExpMonth${idx}`] = "";
    temp[`ExpYear${idx}`] = "";
    temp[`BillingAddr1${idx}`] = "";
    temp[`BillingCity${idx}`] = "";
    temp[`BillingState${idx}`] = "";
    temp[`BillingZip${idx}`] = "";

    fetch('http://localhost:3000/api/paymentInfo/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp)
    }).then(() => {
      console.log('user payment info updated');
    }).then(() => {
      getPaymentInfo(user.ID).then((paymentInfo) => {
        console.log('PaymentInfo set.' + JSON.stringify(paymentInfo));
        setPaymentInfo(paymentInfo);
      })
    })
  }

  const deleteHomeAddress = () => {

    var temp = paymentInfo;
    temp[`HomeAddr`] = null;
    temp[`HomeCity`] = null;
    temp[`HomeState`] = null;
    temp[`HomeZip`] = null;

    fetch('http://localhost:3000/api/paymentInfo/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp)
    }).then(() => {
      console.log('user payment info updated');
    }).then(() => {
      getPaymentInfo(user.ID).then((paymentInfo) => {
        console.log('PaymentInfo set.' + JSON.stringify(paymentInfo));
        setPaymentInfo(paymentInfo);
      })
    })
  }

  const addHomeAddress = () => {
    
    var temp = paymentInfo;
    temp[`HomeAddr`] = '';
    temp[`HomeCity`] = '';
    temp[`HomeState`] = '';
    temp[`HomeZip`] = '';

    fetch('http://localhost:3000/api/paymentInfo/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp)
    }).then(() => {
      console.log('user payment info updated');
    }).then(() => {
      getPaymentInfo(user.ID).then((paymentInfo) => {
        console.log('PaymentInfo set.' + JSON.stringify(paymentInfo));
        setPaymentInfo(paymentInfo);
      })
    })
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_igacmqk', 'template_22epg6s', form.current, 'Af-MFx6Rz7TF52rGU')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  const changePassword = (
    <div id="column-container">
      <div id="column-title">Change Password</div>
      <hr />
      {passwordErrorMsg && <p style={{ color: "red" }}>{passwordErrorMsg}</p>}
      <label id="text-label" htmlFor="newPassword">Current Password</label>
      <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="currentPassword"
        placeholder="*************" id="input-field" name="currentPassword" />
      <label id="text-label" htmlFor="newPassword">New Password</label>
      <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="newPassword"
        placeholder="*************" id="input-field" name="Password" />
      <label id="text-label" htmlFor="confirmNewPassword">Confirm Password</label>
      <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="confirmNewPassword" placeholder="*************" id="input-field"
        name="confirmNewPassword" />
      <button id="update-button" disabled={!newPassword && !confirmNewPassword} onClick={updatePassword}>Update
        Password
      </button>
    </div>
  )

  const registerPromotion = (
    <div id="column-container" style={{ width: "fit-content" }}>
      <div id="column-title">Promotions</div>
      <hr />
      <div id="promotion-text">
        Consider signing up for future promotions and offers.
        Logged in users can take advantage of great deals by
        subscribing for weekly emails. A code will be sent to
        your email associated with your account which can be
        entered at checkout for the best price.
      </div>
      <hr />
      <div>Promotions will be sent to: {updatingUser.Email}</div>
      <FormGroup id="promotion">
        <FormControlLabel control={<Checkbox />} label="Subscribe to Promotions" checked={checked} onChange={handleChange} name="IsRegistered"/>
      </FormGroup>
    </div>
  )

  const accountInfo = (
    <div id = "column-container">
      <div id = "column-title">Account Information</div>
      <hr  />
      <label id="text-label" htmlFor="firstName">First Name</label>
      <input value={updatingUser.FirstName} onChange={handleUserChange} type="firstName"
        placeholder="First Name" id="input-field" name="FirstName" />
      <label id="text-label" htmlFor="lastName">Last Name</label>
      <input value={updatingUser.LastName} onChange={handleUserChange} type="lastName"
        placeholder="Last Name" id="input-field" name="LastName" />
      <label id="text-label" htmlFor="phoneNumber">Phone Number</label>
      <input value={updatingUser.PhoneNumber} onChange={handleUserChange} type="phoneNumber"
        placeholder="+1(123) 456-7890" id="input-field" name="PhoneNumber" />
        <button id="update-button" type="submit">Submit</button>
        <Link style={{alignSelf: "center"}} onClick={overlayHandler}><button id="update-button">Order History</button></Link>
      {/* <label id="text-label" htmlFor="email">Email</label>
      <label type="email" id="input-field" name="email" >{updatingUser.Email} </label> */}
      <div>
        {registerPromotion}
      </div>
    </div>
  )

  const shippingInfo = (
    <div id = "column-container">
      <label id = "column-title">Shipping Information</label>
      <hr/>
      {(paymentInfo.HomeAddr === null) && (<button id="update-button" onClick={() => addHomeAddress()}>Create New</button>)}
      {paymentInfo[`HomeAddr`] !== null && (
        <div className='billing-address-entry'>
          <table>
            <tr>
              <td>
              <label id="text-label">Street Address</label>
              </td>
              <td>
              <input name='HomeAddr.Addr' defaultValue={paymentInfo.HomeAddr} onChange={handlePaymentChange} id="input-field"/>
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">City</label>
              </td>
              <td>
              <input name='HomeAddr.City' defaultValue={paymentInfo.HomeCity } onChange={handlePaymentChange} id="input-field"/>
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">State</label>
              </td>
              <td>
              <input name='HomeAddr.State' defaultValue={paymentInfo.HomeState} onChange={handlePaymentChange} id="input-field"/>
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">Zip Code</label>
              </td>
              <td>
              <input name='HomeAddr.Zip' defaultValue={paymentInfo.HomeZip} onChange={handlePaymentChange} id="input-field" />
              </td>
            </tr>
          </table>
          <button id='edit-button' onClick={() => deleteHomeAddress()}>Remove</button>
          <hr id="shipping-address-entry"/>
          <button id="update-button" type="submit">Submit</button>
        </div>
      )} 
    </div>
  )

  const cards =(
    <div >
      {(paymentInfo.CardNumber1 === null && paymentInfo.CardNumber2  === null && paymentInfo.CardNumber3 === null) && (<button id="update-button" onClick={() => addPaymentInfo(1)}>Create New</button>)}
      {iter.map((idx) => (
        <div className="billing-address-entry">
        {paymentInfo[`CardNumber${idx}`] !== null && (
            <div id="column-container" >
            <label id="text-label" htmlFor="cardNum">Card {idx}</label>
          <input defaultValue={paymentInfo[`CardNumber${idx}`]} onChange={handlePaymentChange} type="cardNum"
            placeholder="1234 5678 9012 3456" id="input-field" name={`CardNumber${idx}`} />
          <label id="text-label" htmlFor="expireDateNum">Expiration Date</label>
          <div id="expiration-date">
            <div id="data-selector">
              <label id="text-label" htmlFor="month">Month</label>
              <select name="ExpMonth" id="expireMonth" defaultValue={paymentInfo[`ExpMonth${idx}`]}
                onChange={handlePaymentChange}>
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
            </div>
            <div id="data-selector">
              <label id="text-label" htmlFor="year">Year</label>
              <select name="ExpYear" id="expireYear" defaultValue={paymentInfo[`ExpYear${idx}`]}
                onChange={handlePaymentChange}>
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
          </div>
          <div id = "column-container">
        <div>
        <label id = "column-title">Billing Address</label>
          <table>
            <tr>
              <td>
              <label id="text-label">Street Address</label>
              </td>
              <td>
              <input defaultValue={paymentInfo[`BillingAddr${idx}`]} onChange={handlePaymentChange} name='addr' id="input-field" />
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">City</label>
              </td>
              <td>
              <input defaultValue={paymentInfo[`BillingCity${idx}`]} onChange={handlePaymentChange} id="input-field" name='City'/>
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">State</label>
              </td>
              <td>
              <input defaultValue={paymentInfo[`BillingState${idx}`]} onChange={handlePaymentChange} id="input-field" name='State'/>
              </td>
            </tr>
            <tr>
              <td>
              <label id="text-label">Zip Code</label>
              </td>
              <td>
              <input defaultValue={paymentInfo[`BillingZip${idx}`]} onChange={handlePaymentChange} id="input-field" name='Zip'/>
              </td>
            </tr>
          </table>
        </div>
    </div>
    <table>
      <tr>
        <td>
          <button id='edit-button' onClick={() => addPaymentInfo(idx + 1)}>Add</button>
        </td>
        <td>
          <button id='edit-button'  onClick={() => deletePaymentInfo(idx)}>Remove</button>
        </td>
      </tr>
    </table>
          </div>
            )}
      </div>
      ))}
      <div style={{ flexDirection:"row" }}>
        {(paymentInfo.CardNumber1 !== null || paymentInfo.CardNumber2  !== null || paymentInfo.CardNumber3 !== null) && (<button id="update-button" type="submit">Submit</button>)}
      </div>
    </div>
  )

  const billingInfo = (
    <div id = "column-container">
      <div id = "column-title">Billing Information</div>
      <hr />
      {cards}
    </div>
  )

  return (
    <div className="home-container">
      <form className="account-form" onSubmit={submit} ref={form}>
        <h1>Edit Profile</h1>
        <div id="page-container">
          <div>
            {accountInfo}
            {shippingInfo}
            {changePassword}
          </div>
          <div>
                {billingInfo}
                {/* {shippingInfo} */}
          </div>
        </div>
      </form>
      <div>
        {displayOverlay && (
            <div id="overlay">
                <button id="close-overlay" onClick={overlayHandler}><p>&#10006;</p></button>
                <div id="popup">
                    <OrderOverlay userEmail = {user.Email}/>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Account;
