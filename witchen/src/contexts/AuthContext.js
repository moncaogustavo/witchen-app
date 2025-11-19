import React, { createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);


const login = async (email, senha) => {
// backend
setUser({ email });
};


const signup = async (dados) => {
// backend
};


const logout = () => setUser(null);


return (
<AuthContext.Provider value={{ user, login, logout, signup }}>
{children}
</AuthContext.Provider>
);
};