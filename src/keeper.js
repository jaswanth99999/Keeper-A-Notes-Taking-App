import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import App from "./components/App.jsx"
import Login from "./components/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"

function Keeper() {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route element={<ProtectedRoutes />}>
                <Route path="/app" element={<App />} exact />
            </Route>
        </Routes>
    )
}

export default Keeper