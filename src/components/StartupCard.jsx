export default function StartupCard({ startup }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-800">{startup?.startup}</h2>
        <p className="text-gray-600 text-sm italic">{startup?.subtitle}</p>

        <div className="mt-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Sector:</span> {startup?.sector}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Power:</span> {startup?.power}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Weakness:</span> {startup?.weakness}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
          <div className="bg-blue-50 p-2 rounded-lg text-center">
            <p className="font-semibold text-blue-700">Budget</p>
            <p className="text-gray-800">{startup?.budget}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <p className="font-semibold text-green-700">Runway</p>
            <p className="text-gray-800">{startup?.runway} mo</p>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg text-center">
            <p className="font-semibold text-purple-700">CAC / LTV</p>
            <p className="text-gray-800">
              {startup?.cac} / {startup?.ltv}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium">
            Owned Cards:
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {startup?.ownedCards?.map((cardId, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-mono"
              >
                {cardId}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-700 transition">
            View Startup
          </button>
        </div>
      </div>
    </div>
  );
}
