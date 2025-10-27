import { useState } from "react";
import { buyCard } from "../firebase/Teamfunctions";
import { Clipboard, DollarSign, Zap, Info, Eye } from "lucide-react";

export default function ActionCard({ card, userId }) {
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = async () => {
    
    setIsBuying(true);
    const success = await buyCard(userId, card.id);
    setIsBuying(false);

    if (success) {
      alert(`You bought ${card.cardName}!`);
    } else {
      alert("Purchase failed!");
    }
  };

  return (
    <div className="relative bg-linear-to-t from-gray-800 to-gray-900 text-white rounded-4xl shadow-lg p-6 flex flex-col gap-4 transform transition-all hover:scale-105 hover:shadow-2xl">
      {/* Card Name */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clipboard size={24} /> {card.cardName}
        </h3>
        <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
          <DollarSign size={16} /> {card.price}M
        </span>
      </div>

      {/* Availability */}
      <p className="flex items-center gap-2 text-sm text-gray-200">
        <Eye size={16} /> <span className="font-semibold">Available:</span> {card.cardCount}
      </p>

      {/* Function */}
      <p className="flex items-center gap-2 text-sm">
        <Zap size={16} /> <span className="font-semibold">Function:</span> {card.cardFunction || "No function"}
      </p>

      {/* Effect */}
      <p className="flex items-center gap-2 text-sm">
        <Info size={16} /> <span className="font-semibold">Effect:</span> {card.effect || "No effect"}
      </p>

      {/* Buy Button */}
      <button
        disabled={card.cardCount <= 0 || isBuying}
        onClick={handleBuy}
        className="mt-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isBuying ? "Buying..." : "Buy"}
      </button>
    </div>
  );
}
