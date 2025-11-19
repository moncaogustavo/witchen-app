import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    // backend
    setUser({ email });
  };

  const signup = async (dados) => {
    // backend - aqui você faria a chamada para a API
    // Por enquanto, apenas simula o cadastro
    console.log('Cadastrando usuário:', dados);
    // Em uma implementação real, você faria:
    // const response = await api.post('/signup', dados);
    // return response.data;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

