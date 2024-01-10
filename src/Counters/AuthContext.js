import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [isloggedin, setisloggedin] = useState(false)
    const [authUser, setAuthUser] = useState("");
    return (
        <AuthContext.Provider value={{ isloggedin, setisloggedin, authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}