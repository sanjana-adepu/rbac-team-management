import { createContext, useContext, useState } from "react";
import API from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    return res.data;
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);

    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};