import { useEffect, useState } from "react";
import { listenToAvailableTeams } from "../firebase/Teamfunctions";
import NavbarAdmin from "../components/NavBarAdmin";
import StartupCard from "../components/StartupCard";

const AdminDashboardTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToAvailableTeams((fetchedTeams) => {
      setTeams(fetchedTeams);
      console.log("All Teams:", fetchedTeams);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-20 bg-black">
        {teams.map((team) => (
          <StartupCard key={team.id} startup={team} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardTeams;
