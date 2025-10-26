import { useEffect, useState } from "react";
import { buyCard } from "../firebase/Teamfunctions";
import { useAuth } from "../context/AuthContext";

export default function ActionCard({ card, userId }) {
  const handleBuy = async () => {
    const success = await buyCard(userId, card.id);
    if (success) {
      alert(`You bought ${card.cardName}!`);
      //onPurchase(); // Refresh cards after purchase
    } else {
      alert("Purchase failed!");
    }
  };

  return (
    <div className="border p-4 rounded-md flex flex-col gap-2 bg-gray-800 text-white">
      <h3 className="font-bold">{card.cardName}</h3>
      <p>Price: ₹{card.price}</p>
      <p>Available: {card.cardCount}</p>
      <p>Effect: {card.effect || "No effect"}</p>
      <button
        disabled={card.cardCount <= 0}
        onClick={handleBuy}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Buy
      </button>
    </div>
  );
};
