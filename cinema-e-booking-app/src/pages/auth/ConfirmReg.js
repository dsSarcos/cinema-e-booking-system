import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './ConfirmReg.css';

const ConfirmReg = () => {
    const location = useLocation();
    const { userInfo } = location.state;
    const [confirmNum, setConfirmNum] = useState('');
    console.log(userInfo);
    
    const submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/users/update/active_status/${userInfo.Email}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo.Email)
      }).then(() => {
        console.log('Updated user status.');
      })
    }


    return (
        <div className='confirm-registration-container'>
            <div className="panel-container">
            <form className="confirmation-form" onSubmit={submit}>
                <br/>
                <p>Please enter the confirmation number sent to your email below. </p>
                <hr/>
                <label className="confirm-registration-label" htmlFor="name"><h3>Confirmation Number</h3></label>
                <input className="confirmation-text-field" value={confirmNum} onChange={(e) => setConfirmNum(e.target.value)} type="confirmNum" placeholder="Confirmation Number" id="confirmNumber" name="confirmNum"></input>
                <Link to="/validation">
                    <button id="confirmation-button" type="submit">Submit</button>
                </Link>
            </form>
        </div>
        </div>
    );
}

export default ConfirmReg;