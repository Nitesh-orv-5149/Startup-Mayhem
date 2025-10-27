import React from 'react'

export default function TeamCard({onClick, team}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-linear-to-b from-gray-950 to-gray-900 rounded-2xl shadow hover:shadow-lg transition p-5 border border-gray-100 dark:border-gray-800"
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
  )
}
