import { useEffect, useState } from "react";
import { getCard } from "../firebase/Cardfunctions";
import { fetchTeams } from "../firebase/Teamfunctions";
import TeamCard from "../components/TeamCard";
import TeamModal from "../components/TeamModal";
import NavbarAdmin from "../components/NavBarAdmin";

export default function AdminTeam() {
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
      <NavbarAdmin onLogout={handleLogout} />

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
              <TeamCard key={team.id} team={team} onClick={() => setSelectedTeam(team)}/>
            ))
          )}
        </div>

        {/* Team Modal */}
        {selectedTeam && (
          <TeamModal onClick={() => setSelectedTeam(null)} selectedTeam={selectedTeam} ownedCardNames={ownedCardNames}/>
        )}
      </main>
    </div>
  );
}
