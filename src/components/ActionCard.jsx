import { useEffect, useState } from "react";
import { buyCard } from "../firebase/Teamfunctions";
import { getCard } from "../firebase/Cardfunctions";
import { listenToTeamPhase } from "../firebase/gameState"; // ✅ Import listener
import { Clipboard, DollarSign, Zap, Info, Eye } from "lucide-react";

export default function ActionCard({ card, cardId, userId, readOnly = false }) {
  const [cardData, setCardData] = useState(card || null);
  const [isBuying, setIsBuying] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [phase, setPhase] = useState(0); // 🔥 Listen to real-time game phase

  // 🔹 Listen to game phase in real-time
  useEffect(() => {
    const unsubscribe = listenToTeamPhase(setPhase);
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch card data if only cardId is provided
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCard(cardId);
        setCardData(data);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    if (!card && cardId) fetchCard();
  }, [cardId, card]);

  // 🔹 Handle Buy
  const handleBuyConfirm = async () => {
    // 🔸 Phase restrictions before buying
    if (phase === 0) {
      alert("⛔ You can’t buy cards right now! Wait for the next phase.");
      return;
    }

    setIsBuying(true);
    setShowConfirm(false);

    const success = await buyCard(userId, cardData.id || cardId, phase);
    setIsBuying(false);

    if (success) {
      alert(`✅ You bought ${cardData.cardName}!`);
    } else {
      alert("❌ Purchase failed!");
    }
  };

  // 🕓 Loading placeholder
  if (!cardData) {
    return (
      <div className="bg-gray-800 text-gray-400 rounded-3xl shadow-lg p-6 text-center">
        Loading card...
      </div>
    );
  }

  // 🧩 Read-only mode
  if (readOnly) {
    return (
      <div className="relative bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-3xl shadow-lg p-6 flex flex-col gap-3 hover:scale-105 hover:shadow-2xl transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clipboard size={24} /> {cardData.cardName}
          </h3>
          <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
            <DollarSign size={16} /> {cardData.price}M
          </span>
        </div>

        <p className="flex items-center gap-2 text-sm text-gray-200">
          <Zap size={16} /> <span className="font-semibold">Function:</span>{" "}
          {cardData.cardFunction || "No function"}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-200">
          <Info size={16} /> <span className="font-semibold">Effect:</span>{" "}
          {cardData.effect || "No effect"}
        </p>
      </div>
    );
  }

  // 🧠 Full interactive card (with phase rules)
  return (
    <div className="relative bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-3xl shadow-lg p-6 flex flex-col gap-4 transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clipboard size={24} /> {cardData.cardName}
        </h3>
        <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
          <DollarSign size={16} /> {cardData.price}M
        </span>
      </div>

      <p className="flex items-center gap-2 text-sm text-gray-200">
        <Eye size={16} /> <span className="font-semibold">Available:</span>{" "}
        {cardData.cardCount}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <Zap size={16} /> <span className="font-semibold">Function:</span>{" "}
        {cardData.cardFunction || "No function"}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <Info size={16} /> <span className="font-semibold">Effect:</span>{" "}
        {cardData.effect || "No effect"}
      </p>

      {/* 🔥 Disable buy button based on phase */}
      <button
        disabled={cardData.cardCount <= 0 || isBuying || phase === 0}
        onClick={() => setShowConfirm(true)}
        className={`mt-2 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          phase === 0
            ? "bg-gray-500"
            : "bg-white/20 hover:bg-white/30 text-white"
        }`}
      >
        {phase === 0
          ? "Locked (Phase 0)"
          : isBuying
          ? "Buying..."
          : "Buy"}
      </button>

      {showConfirm && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-3xl z-20">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-72 text-center flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Confirm Purchase</h2>
            <p className="text-sm text-gray-300">
              Are you sure you want to buy <br />
              <span className="font-bold">{cardData.cardName}</span> for{" "}
              <span className="font-bold">{cardData.price}M</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyConfirm}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
