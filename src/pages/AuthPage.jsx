import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [startup, setStartup] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, message, user, setUser } = useAuth(); // make sure your context allows setUser

  // On component mount, check if user info exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // set user in context
      console.log(storedUser)
    }
  }, [setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, isAdmin, startup: loggedInStartup } = await login(startup, password);
    if (success) {
      localStorage.setItem("user", JSON.stringify({loggedInStartup, isAdmin})); // save to localStorage
      console.log({loggedInStartup, isAdmin})
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Startup Login</h2>

      {user ? (
        <p>Welcome, {user.loggedInStartup}! 🎉</p>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Startup Name:</label>
            <input
              type="text"
              value={startup}
              onChange={(e) => setStartup(e.target.value)}
              required
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ marginTop: "1rem" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
};

export default AuthPage;
