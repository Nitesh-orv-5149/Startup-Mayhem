import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import StatsPage from "./pages/TeamStatsPage";
import AdminDashboard from "./pages/AdminCards";
import AdminTeam from "./pages/AdminTeam";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute"; // import the wrapper

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cards"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <ProtectedRoute>
              <AdminTeam />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
