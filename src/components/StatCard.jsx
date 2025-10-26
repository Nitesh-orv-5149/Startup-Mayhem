const StatCard = ({ label, value, trend }) => {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white dark:bg-[#141414] shadow-sm rounded-lg p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
        {trend !== undefined && (
          <p
            className={`text-sm font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
