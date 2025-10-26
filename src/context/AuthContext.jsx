import React, { createContext, useState, useContext } from "react";
import { getAuth } from "../firebase/Authfunctions";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user info
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message to display

  // Login function
  const login = async (startup, password) => {
    setLoading(true);
    const result = await getAuth(startup, password);

    if (result.success) {
      setUser({ startup }); // You can store more user info here
    } else {
      setUser(null);
    }

    setMessage(result.message);
    setLoading(false);

    return {
      success: result.success,
      isAdmin: result.isAdmin,
      startup: startup
    };        
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setMessage("");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, message }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
