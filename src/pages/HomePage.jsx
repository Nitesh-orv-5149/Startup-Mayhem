import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTeam } from "../firebase/Teamfunctions";
import StatCard from "../components/StatCard";
import Navbar from "../components/NavBar";
import ActionCard from "../components/ActionCard";

const HomePage = () => {
  const { user, logout } = useAuth(); // assuming logout exists in your AuthContext
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?.id || user?.userData?.id || null;

  const [userData, setUserData] = useState(user?.userData || {});
  const [ownedCards, setOwnedCards] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Real-time team updates
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribeTeam = getTeam(currentUserId, (updatedData) => {
      if (updatedData) {
        setUserData(updatedData);
        setOwnedCards(updatedData.ownedCards || []);
      }
    });

    return () => unsubscribeTeam();
  }, [currentUserId]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display">
      <Navbar />
      <div className="flex flex-col flex-1 items-center justify-start mt-24 px-4 sm:px-8">

        {/* Header Section */}
        <div className="flex items-center justify-between w-full max-w-5xl mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Team Dashboard
          </h2>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
          <StatCard
            label="Budget"
            value={`$${Number(userData.budget || 0).toFixed(2)}M`}
          />
          <StatCard label="Runway" value={userData.runway + " months"} />
          <StatCard label="CAC" value={`${userData.cac || 0}`} />
          <StatCard label="LTV" value={`${userData.ltv || 0}`} />
          <StatCard label="Power" value={userData.power || "—"} />
          <StatCard label="Weakness" value={userData.weakness || "—"} />
          <StatCard label="Sector" value={userData.sector || "—"} />
          <StatCard label="Startup" value={userData.startup || "—"} />
        </div>

        {/* Subtitle */}
        <div className="max-w-3xl text-center text-gray-600 dark:text-gray-400 mb-8">
          <p className="text-lg italic">
            {userData.subtitle || "No startup subtitle available."}
          </p>
        </div>

        {/* Owned Cards */}
        {ownedCards.length > 0 ? (
          <div className="w-full max-w-5xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Your Cards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ownedCards.map((card, idx) => (
                <ActionCard key={card.cardId || idx} cardId={card} readOnly={true} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            You don't own any cards yet.
          </p>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              Confirm Logout
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
