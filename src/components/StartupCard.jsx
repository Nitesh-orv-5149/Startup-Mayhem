export default function StartupCard({ startup }) {
  return (
    <div
      className="bg-blue-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg 
                 transition-all overflow-hidden aspect-[4/3] flex flex-col justify-between p-5"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">
          {startup?.startup}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm italic">
          {startup?.subtitle}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl text-center">
          <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm">Budget</p>
          <p className="text-gray-900 dark:text-gray-200 text-sm">{startup?.budget.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-xl text-center">
          <p className="font-semibold text-green-700 dark:text-green-300 text-sm">Runway</p>
          <p className="text-gray-900 dark:text-gray-200 text-sm">{startup?.runway} mo</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-xl text-center col-span-2">
          <p className="font-semibold text-purple-700 dark:text-purple-300 text-sm">CAC / LTV</p>
          <p className="text-gray-900 dark:text-gray-200 text-sm">
            {startup?.cac} / {startup?.ltv}
          </p>
        </div>
      </div>

      {/* Sector and Traits */}
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        <p><span className="font-semibold">Sector:</span> {startup?.sector}</p>
        <p><span className="font-semibold">Power:</span> {startup?.power}</p>
        <p><span className="font-semibold">Weakness:</span> {startup?.weakness}</p>
      </div>

      {/* Owned Cards */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Owned Cards:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {startup?.ownedCards?.length > 0 ? (
            startup.ownedCards.map((cardId, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-mono"
              >
                {cardId}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">None</span>
          )}
        </div>
      </div>

      {/* View Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-700 transition">
          View Startup
        </button>
      </div>
    </div>
  );
}
