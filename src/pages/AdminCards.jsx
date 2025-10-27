import { useEffect, useState } from "react";
import { listenToAvailableCards } from "../firebase/Cardfunctions";
import NavbarAdmin from "../components/NavBarAdmin";
import ActionCard from "../components/ActionCard";

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    const unsubscribe = listenToAvailableCards((fetchedCards) => {
      setCards(fetchedCards);
      console.log("All Cards:", fetchedCards); // ✅ Log all cards
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <NavbarAdmin/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-20 bg-black">
          {cards.map((card) => (
            <ActionCard
              key={card.id}
              card={card}
              readOnly={true}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
