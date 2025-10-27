import React from 'react'

export default function TeamModal({onClick, selectedTeam, ownedCardNames}) {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] p-6">
            <button
              onClick={onClick}
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
  )
}
