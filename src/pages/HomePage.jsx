import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTeam } from "../firebase/Teamfunctions";
import StatCard from "../components/StatCard";
import Navbar from "../components/NavBar";

const HomePage = () => {
  const { user } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?.id || user?.userData?.id || null;
  const [userData, setUserData] = useState(user?.userData || {});

  // Real-time team updates
  useEffect(() => {
    if (!currentUserId) return;
    const unsubscribeTeam = getTeam(currentUserId, (updatedData) => {
      if (updatedData) setUserData(updatedData);
    });
    return () => unsubscribeTeam();
  }, [currentUserId]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display">
      <Navbar />
      <div className="flex flex-col flex-1 items-center justify-start mt-24 px-4 sm:px-8">
        {/* Header Section */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Team Dashboard
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
          <StatCard
            label="Budget"
            value={`₹${Number(userData.budget || 0).toFixed(2)}`}
          />
          <StatCard label="Runway" value={userData.runway+' months'} />
          <StatCard label="CAC" value={`₹${userData.cac || 0}`} />
          <StatCard label="LTV" value={`₹${userData.ltv || 0}`} />
          <StatCard label="Power" value={userData.power || "—"} />
          <StatCard label="Weakness" value={userData.weakness || "—"} />
          <StatCard label="Sector" value={userData.sector || "—"} />
          <StatCard label="Startup" value={userData.startup || "—"} />
        </div>

        {/* Subtitle / Description */}
        <div className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
          <p className="text-lg italic">
            {userData.subtitle || "No startup subtitle available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
