import { useEffect, useState } from "react";
import { listenToAvailableCards } from "../firebase/Cardfunctions";
import ActionCard from "../components/ActionCard";
import Navbar from "../components/NavBar";

const CardsPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToAvailableCards(setCards);
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display">
      <Navbar />
      <div className="p-6 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Available Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <ActionCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
