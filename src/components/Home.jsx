import React from "react";
import Button from 'react-bootstrap/Button';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    function switchToLoginPage() {
        navigate('/login')
    }

    function switchToSignUpPage() {
        navigate('/register')
    }
    return (
        <div className="home">
            <div id="homeHeader"><h1>WELCOME TO YOUR KEEPER</h1></div>
            <div> <img src="https://www.google.com/images/icons/product/keep-512.png" /></div>
            <div id="loginButton"><Button onClick={switchToLoginPage} variant="dark">LOGIN</Button></div>
            <div id="signUpButton"><Button onClick={switchToSignUpPage} variant="secondary">SIGNUP</Button>{' '}</div>
        </div>
    )
}

export default Home