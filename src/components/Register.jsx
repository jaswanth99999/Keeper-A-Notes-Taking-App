import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Counters/AuthContext";

function Register() {

    const [defUsername, setUsername] = useState("");
    const [defPass, setPassword] = useState("");
    const authInfo = useContext(AuthContext);

    function handleChange(e) {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }


    const navigate = new useNavigate();

    // Function to submit the form data using Axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username: defUsername, password: defPass }
        try {
            const response = await axios.post("http://localhost:3001/register", formData);
            console.log("Post created:", response.data.message);
            if(response.data === "User Exists") {
                alert("User " + defUsername + " Already exists.. Please login..")
            }
            else {
                authInfo.setisloggedin(true);
                authInfo.setAuthUser(response.data.userId)
                alert("User Registered...")
                navigate('/login')
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return <div className="container mt-5">
        <h1>Register</h1>

        <div className="row">
            <div className="col-sm-8">
                <div className="card">
                    <div className="card-body">

                        {/* <!-- Makes POST request to /register route --> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={handleChange} value={defUsername} className="form-control" name="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={handleChange} value={defPass} className="form-control" name="password" />
                            </div>
                            <button type="submit" className="btn btn-dark">Register</button>
                        </form>

                    </div>
                </div>
            </div>

        {/* <div className="col-sm-4">
        <div className="card social-block">
          <div className="card-body">
            <a className="btn btn-block" href="/auth/google" role="button">
              <i className="fab fa-google"></i>
              Sign Up with Google
            </a>
          </div>
        </div>
      </div> */}

        </div>
    </div>
}

export default Register;