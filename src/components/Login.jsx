import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Counters/AuthContext';

function Login() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username: defUsername, password: defPass }
        try {
            const response = await axios.post("http://localhost:3001/login", formData);
            authInfo.setisloggedin(true)
            authInfo.setAuthUser(response.data.userId)
            navigate('/app')
        } catch (error) {
            if (error.response.status === 401) {
                alert("Authentication Failed.. Username or Password Invalid.. Please Try Again..")
                setUsername("");
                setPassword("");
            }
            console.error("Error creating post:", error);
        }
    };

    // const googleSignIn = async () => {
    //     try{
    //         const response = await axios.get("http://localhost:3001/auth/google");
    //     } catch (err) {
    //         console.log(err)
    //     }
        
    // }


    return <div className="container mt-5">
        <h1>Login</h1>

        <div className="row">
            <div className="col-sm-8">
                <div className="card">
                    <div className="card-body">

                        {/* <!-- Makes POST request to /login route --> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={handleChange} value={defUsername} type="email" className="form-control" name="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={handleChange} value={defPass} type="password" className="form-control" name="password" />
                            </div>
                            <button type="submit" className="btn btn-dark">Login</button>
                        </form>

                    </div>
                </div>
            </div>

            {/* <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <a className="btn btn-block" href="http://localhost:3001/auth/google" role="button">
                            <i className="fab fa-google"></i>
                            Sign In with Google
                        </a>
                    </div>
                </div>
            </div> */}

        </div>
    </div>
}

export default Login;