import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import StatsPage from "./pages/TeamStatsPage";
import AdminDashboard from "./pages/AdminCards";
import AdminTeam from "./pages/AdminTeam";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/admin/cards" element={<AdminDashboard />} />
        <Route path="/admin/teams" element={<AdminTeam />} />
      </Routes>
    </BrowserRouter>
  );
}
