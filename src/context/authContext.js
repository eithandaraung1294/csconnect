import { createContext, useEffect, useState } from "react";
import axios from '../api/axios';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs,{ withCredentials: true });
        // setCurrentUser(res.data);
        // setToken(res.token);
    };

    const logout = async (inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
};