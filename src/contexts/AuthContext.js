import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { app } from "../../src/services/firebaseConfig"; // seu firebase.js
import { useRouter } from "expo-router";



const AuthContext = createContext({
  user: null,
  logado: false,
  login: async () => { },
  signup: async () => { },
  logout: async () => { },
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLogado(true);
        await AsyncStorage.setItem("@user", JSON.stringify(firebaseUser));
      } else {
        setUser(null);
        setLogado(false);
        await AsyncStorage.removeItem("@user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, senha) => {
    const res = await signInWithEmailAndPassword(auth, email, senha);
    setUser(res.user);
    setLogado(true);
    await AsyncStorage.setItem("@user", JSON.stringify(res.user));
  };

  const signup = async ({ email, senha }) => {
    const res = await createUserWithEmailAndPassword(auth, email, senha);
    setUser(res.user);
    setLogado(true);
    await AsyncStorage.setItem("@user", JSON.stringify(res.user));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLogado(false);
    await AsyncStorage.removeItem("@user");
    router.replace("/login"); // redireciona pro login
  };

  return (
    <AuthContext.Provider value={{ user, logado, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
