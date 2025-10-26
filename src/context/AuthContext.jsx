import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth } from "../firebase/Authfunctions";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user info
  const [loading, setLoading] = useState(true); // Start as true until we check localStorage
  const [message, setMessage] = useState(""); // Message to display

  // 🧠 Load user from localStorage on mount (persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 Login function
  const login = async (startup, password) => {
    setLoading(true);
    const { success, message, isAdmin, user } = await getAuth(startup, password);

    if (success) {
      const loggedUser = { startup, isAdmin, user };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser)); // save for persistence
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }

    setMessage(message);
    setLoading(false);

    return { success, isAdmin, user };
  };

  // 🚪 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setMessage("");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, message }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
