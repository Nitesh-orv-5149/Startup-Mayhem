import { useEffect, useState } from "react";
import {
  listenToAvailableCards,
  getCardHistory,
  completePurchase,
} from "../firebase/Cardfunctions";
import { useAuth } from "../context/AuthContext";
import ActionCard from "../components/ActionCard";

const HomePage = () => {
  const { user } = useAuth();
  const userData = user?.userData || {};
  // 🧠 Get logged-in user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?.id || null;
  const userBalance = userData?.budget || 0;
  console.log("User Balance:", userBalance);


  const [cards, setCards] = useState([]);
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState({}); // { cardId: count }
  
  console.log("Current User:", user);

  useEffect(() => {
    const unsubscribe = listenToAvailableCards((fetchedCards) => {
      setCards(fetchedCards);
      console.log("All Cards:", fetchedCards); // ✅ Log all cards
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <div>BUDGET = {userData.budget}</div>
      <h2 className="text-2xl font-bold mb-4">Available Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <ActionCard
            key={card.id}
            card={card}
            userId={userData.id}
            //onPurchase={fetchCards} // refresh after buying
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
