import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [sectors, setSectors] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const snapshot = await getDocs(collection(db, "teams"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeams(data);
        setFiltered(data);
        const sectorList = [...new Set(data.map((t) => t.sector).filter(Boolean))];
        setSectors(sectorList);
      } catch (err) {
        console.error("Error loading teams:", err);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const filteredData = teams.filter((t) => {
      const matchesSearch = t.startup?.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sectorFilter ? t.sector === sectorFilter : true;
      return matchesSearch && matchesSector;
    });
    setFiltered(filteredData);
  }, [search, sectorFilter, teams]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-950 font-display">
      {/* Sidebar (hidden on mobile) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <h1 className="text-gray-900 dark:text-white text-xl font-bold mb-8 flex items-center gap-2">
            
            Startup Mayhem
          </h1>

          <nav className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
              
              <p className="text-sm font-medium leading-normal">Teams</p>
            </div>
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
            >
            
              <p className="text-sm font-medium">Logout</p>
            </button>
          </div>
        </div>
      </aside>

      {/* Top bar (mobile only) */}
      <div className="flex md:hidden items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <h1 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
          
          Startup Mayhem
        </h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 dark:text-gray-300"
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold leading-tight">
            Team Statistics
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by startup name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
          />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
          >
            <option value="">All Sectors</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {[
                  "Team ID",
                  "Startup",
                  "Sector",
                  "Budget",
                  "Runway",
                  "CAC",
                  "LTV",
                  "Power",
                  "Weakness",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 sm:px-6 py-3 ${
                      ["Budget", "Runway", "CAC", "LTV"].includes(h)
                        ? "text-right"
                        : "text-left"
                    } text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    {teams.length === 0
                      ? "Loading teams..."
                      : "No matching teams found."}
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                  >
                    <td className="px-4 sm:px-6 py-3 text-gray-500">{t.id}</td>
                    <td className="px-4 sm:px-6 py-3 font-semibold">
                      {t.startup || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-3">{t.sector || "-"}</td>
                    <td className="px-4 sm:px-6 py-3 text-right">
                      ${t.budget || "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-right">
                      {t.runway || "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-right">
                      ${t.cac || "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-right">
                      ${t.ltv || "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3">{t.power || "—"}</td>
                    <td className="px-4 sm:px-6 py-3">{t.weakness || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
