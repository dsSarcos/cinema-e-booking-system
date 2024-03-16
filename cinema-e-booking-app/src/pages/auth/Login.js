import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import {authenticateUser, getAllUsers} from "../api/api";
import { useGlobalContext } from "../../shared/context/GlobalContext";


const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useGlobalContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');

    const submit = (e) => {
        e.preventDefault();
        // user is whatever authenticateUser(email, password) is returning
        authenticateUser(email, password).then(user => {
            // Check is user = {} which means authentication failed
            if (Object.keys(user).length === 0) {
                setUserErrorMessage("Incorrect Password.");
            } else if (user.IsActive === 0) {
                setUserErrorMessage("User does not have account confirmation.");
            } else if (user.IsActive === 2) {
                setUserErrorMessage("Your account is suspended.");
            } else { // user has valid login
                console.log("SUCCESSFULLY LOGGED IN.");
                fetch(`http://localhost:3000/api/users/update/active_status/${email}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user)
                }).then(() => {
                    console.log('user status is updated.');
                })
                setUser(user);
                if (user.IsAdmin === 1) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        })
    }

    return (
        <div id="login-container">
            <div className="panel-container" >
                <form className="login-form" onSubmit={submit}>
                    <label className="emailHeader">EMAIL</label>
                    <input
                        className="text-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="email..."
                        id="email"
                        name="email"
                    />
                    <label className="passwordHeader">PASSWORD</label>
                    <input
                        className="text-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="password..."
                        id="password"
                        name="password"
                    />
                    <button className="login-button" type="submit">Login</button>
                </form>
                <div id="login-error">
                    {userErrorMessage && userErrorMessage === "Incorrect Password." ?
                            <p style={{ color: "red" }}>{userErrorMessage}</p> :
                            <p style={{ color: "red" }}>{userErrorMessage}</p>
                    }
                </div>
                
                <Link to="/Register">
                    <button className="register-button">Don't have an account? Register here</button>
                </Link>

                <Link to="/request-reset-password">
                    <button className="forgot-password-button">Forgot Password</button>
                </Link>

            </div>
        </div>
    );
}

export default Login;