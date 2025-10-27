import { useEffect, useState } from "react";
import { listenToAvailableCards } from "../firebase/Cardfunctions";
import ActionCardAdmin from "../components/ActionCardAdmin";
import NavbarAdmin from "../components/NavBarAdmin";

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
            <ActionCardAdmin
              key={card.id}
              card={card}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
