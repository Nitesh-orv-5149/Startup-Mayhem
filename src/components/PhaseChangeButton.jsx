import { useEffect, useState } from "react";
import { listenToTeamPhase, updatePhaseForAllTeams } from "../firebase/gameState";

export default function PhaseChangeDropdown() {
  const [phase, setPhase] = useState(null);         // Firestore phase
  const [selectedPhase, setSelectedPhase] = useState(null); // Local dropdown state
  const [status, setStatus] = useState("");          // Feedback text
  const phases = [0, 1, 2];

  // Hardcoded listener (no auth needed)
  useEffect(() => {
    const unsubscribe = listenToTeamPhase((currentPhase) => {
        setPhase(currentPhase);
        setSelectedPhase(currentPhase);
        setStatus("");
    });
    return () => unsubscribe();
   }, []);

  const handleSelectChange = (e) => {
    setSelectedPhase(Number(e.target.value));
    setStatus("");
  };

  const handleUpdate = async () => {
    if (selectedPhase === null || selectedPhase === phase) return;
    await updatePhaseForAllTeams(selectedPhase);
    setStatus(`✅ Updated phase for all teams to ${selectedPhase}`);
  };

  if (phase === null) {
    return <p className="text-gray-400 text-sm">Loading current phase...</p>;
  }

  return (
    <div className="flex flex-col gap-3 bg-zinc-900 rounded-2xl p-4 shadow-md w-fit">
      <div className="flex items-center gap-3">
        <label className="font-semibold text-white text-lg">Phase:</label>

        <select
          value={selectedPhase}
          onChange={handleSelectChange}
          className="border border-gray-500 bg-black text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {phases.map((p) => (
            <option key={p} value={p} className="bg-black text-white">
              {p}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpdate}
          disabled={selectedPhase === phase}
          className={`px-4 py-1 rounded-lg text-white transition-all duration-200 ${
            selectedPhase === phase
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700 active:scale-95"
          }`}
        >
          Update
        </button>
      </div>

      {status && (
        <span className="text-green-400 text-sm font-medium animate-pulse">
          {status}
        </span>
      )}
    </div>
  );
}
