import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (token, id) => {
    setToken(token);
    setUserId(id);
    // You might want to fetch user data here
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
