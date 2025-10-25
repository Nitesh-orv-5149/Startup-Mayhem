import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [startup, setStartup] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, message, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(startup, password);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Startup Login</h2>

      {user ? (
        <p>Welcome, {user.startup}! 🎉</p>
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
