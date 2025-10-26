import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getCard } from "../firebase/Cardfunctions";
import { fetchTeams } from "../firebase/Teamfunctions";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [ownedCardNames, setOwnedCardNames] = useState([]);

  // Fetch teams on mount
  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };
    loadTeams();
  }, []);

  // Fetch owned card names when a team is selected
  useEffect(() => {
    if (!selectedTeam?.ownedCards || selectedTeam.ownedCards.length === 0) {
      setOwnedCardNames([]);
      return;
    }

    const fetchOwnedCards = async () => {
      try {
        const names = await Promise.all(
          selectedTeam.ownedCards.map(async (cardId) => {
            const cardData = await getCard(cardId);
            return cardData?.cardName || "Unnamed Card";
          })
        );
        setOwnedCardNames(names);
      } catch (err) {
        console.error("Error fetching owned cards:", err);
      }
    };

    fetchOwnedCards();
  }, [selectedTeam]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 font-display">
      <Navbar onLogout={handleLogout} />

      <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8 mt-16">
        {/* Header */}
        <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-6">
          Teams Dashboard
        </h1>

        {/* Teams Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Loading teams...</p>
          ) : (
            teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition p-5 border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {team.startup || "Unnamed"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {team.sector || "—"}
                </p>
                <div className="mt-3 flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>Runway: {team.runway ?? "—"}</span>
                  <span>Budget: ${Number(team.budget || 0).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Team Modal */}
        {selectedTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] p-6">
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                {selectedTeam.startup || "Unnamed Startup"}
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Budget", value: `$${Number(selectedTeam.budget || 0).toFixed(2)}` },
                  { label: "Runway", value: selectedTeam.runway ? `${selectedTeam.runway} months` : "—" },
                  { label: "CAC", value: `$${selectedTeam.cac || 0}` },
                  { label: "LTV", value: `$${selectedTeam.ltv || 0}` },
                  { label: "Power", value: selectedTeam.power || "—" },
                  { label: "Weakness", value: selectedTeam.weakness || "—" },
                  { label: "Sector", value: selectedTeam.sector || "—" },
                  { label: "Subtitle", value: selectedTeam.subtitle || "—" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center shadow hover:shadow-lg transition"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.label}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Owned Cards */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Owned Cards
                </h3>
                {ownedCardNames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {ownedCardNames.map((name, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-3 shadow hover:shadow-lg transition text-center"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No cards owned</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
