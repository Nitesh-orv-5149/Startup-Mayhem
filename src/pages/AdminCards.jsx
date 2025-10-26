import { useState } from "react";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("availableCards"); // toggle page
  const [darkMode, setDarkMode] = useState(false); // dark mode toggle

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-display">

        {/* Sidebar */}
        <aside className="flex flex-col w-64 p-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10" 
                     style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6p2wh7T1EaRODZBHIYx5Dpo4qewruN23wNvxzzCV9y6dqVZ0zAGMbWU5k-uBxYoQaGDjjLcVcgP5SyP_5k1TPDVCXGu9gS06jB6Towh0iNkbtdvDXQ_O-MzldVCe4xykIxZOxT5R_ODR2prmVditohSzOY59uTpQjm0oyoAfw9HIUNpZXl4RH9TYOatxaZlQWz2Gbkau6NgljYY15kKs1r2KI44LC-fZNNxNTPtelq-Vay80bYUA3vxJ9bpkrlMcTB0HCutFobTA")`}}></div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium text-slate-900 dark:text-white">Admin Panel</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Startup Inc.</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setActivePage("availableCards")}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
                    activePage === "availableCards"
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined">style</span>
                  <p className="text-sm font-medium">Available Cards</p>
                </button>
                <button
                  onClick={() => setActivePage("teamOwnership")}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
                    activePage === "teamOwnership"
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined">groups</span>
                  <p className="text-sm font-medium">Team Card Ownership</p>
                </button>
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                <span className="material-symbols-outlined">{darkMode ? "light_mode" : "dark_mode"}</span>
                <p className="text-sm font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</p>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 w-full p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">

            {activePage === "availableCards" && (
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Available Cards for Sale</h1>
                <p className="text-base text-slate-500 dark:text-slate-400 mb-6">Summary of available cards by team.</p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[
                    { name: "Innovatech", code: "IVT", count: 1250 },
                    { name: "FutureAI", code: "FAI", count: 875 },
                    { name: "HealthCo", code: "HCO", count: 630 },
                    { name: "GreenTech", code: "GTC", count: 942 },
                    { name: "QuantumLeap", code: "QLP", count: 315 },
                    { name: "BioSynth", code: "BSN", count: 158 },
                    { name: "DataWeave", code: "DWV", count: 111 },
                  ].map((team) => (
                    <div key={team.code} className="flex flex-col gap-4 p-6 bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{team.name}</h2>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{team.code}</span>
                      </div>
                      <p className="text-4xl font-black text-primary dark:text-primary">{team.count}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">cards available</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage === "teamOwnership" && (
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Team Card Ownership</h1>
                <p className="text-base text-slate-500 dark:text-slate-400 mb-6">Which team owns which cards.</p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[
                    { team: "Innovatech", cards: ["Card A", "Card B", "Card C"] },
                    { team: "FutureAI", cards: ["Card D", "Card E"] },
                    { team: "HealthCo", cards: ["Card F", "Card G", "Card H", "Card I"] },
                  ].map((team, idx) => (
                    <div key={idx} className="flex flex-col gap-2 p-4 bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{team.team}</h2>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
                        {team.cards.map((card, i) => <li key={i}>{card}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
