import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Counters/AuthContext'

const ProtectedRoutes = () => {
    // let auth = { 'isloggedin': false }
    const authInfo = useContext(AuthContext);
    return (
        authInfo.isloggedin ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;