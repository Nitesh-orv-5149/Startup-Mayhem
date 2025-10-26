import { useEffect, useState } from "react";
import { listenToAvailableCards } from "../firebase/Cardfunctions";

export default function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToAvailableCards((availableCards) => {
      setCards(availableCards);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <div>
      <h2>Available Cards:</h2>
      {cards.map((card) => (
        <div key={card.id}>
          {card.cardName} — {card.cardCount} left
        </div>
      ))}
    </div>
  );
}
