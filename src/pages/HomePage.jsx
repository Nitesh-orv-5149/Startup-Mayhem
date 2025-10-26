import { useEffect, useState } from "react";
import {
  listenToAvailableCards,
  getCardHistory,
  completePurchase,
} from "../firebase/Cardfunctions";
import { useAuth } from "../context/AuthContext";

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

  // Fetch available cards
  useEffect(() => {
    const unsubscribe = listenToAvailableCards(setCards);
    return () => unsubscribe();
  }, []);

  // Fetch purchase history
  useEffect(() => {
    if (!currentUserId) return;
    const unsubscribe = getCardHistory(currentUserId, setHistory);
    return () => unsubscribe();
  }, [currentUserId]);

  // Increment / Decrement handlers
  const handleIncrement = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    const currentCount = cart[cardId] || 0;
    if (currentCount + 1 > card.cardCount) return;

    setCart((prev) => ({ ...prev, [cardId]: currentCount + 1 }));
  };

  const handleDecrement = (cardId) => {
    const currentCount = cart[cardId] || 0;
    if (currentCount === 0) return;

    setCart((prev) => {
      const updated = { ...prev, [cardId]: currentCount - 1 };
      if (updated[cardId] === 0) delete updated[cardId];
      return updated;
    });
  };

  // Calculate total cost
  const totalCost = Object.entries(cart).reduce((sum, [cardId, count]) => {
    const card = cards.find((c) => c.id === cardId);
    return card ? sum + card.price * count : sum;
  }, 0);

  // Purchase handler
  const handlePurchase = async () => {
    if (totalCost > userBalance) {
      alert("Insufficient balance!");
      return;
    }

    try {
      await completePurchase(currentUserId, cart, cards, userRef);
      setCart({});
      alert("Purchase successful!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Purchase failed");
    }
  };

  // Convert ₹ values to millions (supports decimals like 4.5M)
  const formatMillion = (value) => ((value ?? 0) / 1_000_000).toFixed(1);

  return (
    <div className="dark min-h-screen bg-background-dark font-display text-gray-200">
      <div className="flex flex-col w-full overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-3 bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
          <h2 className="text-lg font-bold text-white">StartupMayhem</h2>
          <div className="text-sm text-white">
            ₹{userBalance}M
          </div>
        </header>

        <main className="flex flex-col lg:flex-row flex-1 p-4 sm:p-10 gap-6">
          {/* Purchase History */}
          <div className="lg:w-5/12 flex flex-col gap-4">
            <h2 className="text-[22px] font-bold px-2">Purchase History</h2>
            <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800 p-2">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="px-4 py-2 text-sm font-medium">Card</th>
                    <th className="px-4 py-2 text-sm font-medium">Date</th>
                    <th className="px-4 py-2 text-sm font-medium">
                      Amount (M ₹)
                    </th>
                    <th className="px-4 py-2 text-sm font-medium">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-2 text-sm text-slate-400"
                      >
                        No purchases yet
                      </td>
                    </tr>
                  ) : (
                    history.map((h) => (
                      <tr key={h.id} className="border-t border-slate-700">
                        <td className="px-4 py-2 text-sm">{h.cardName}</td>
                        <td className="px-4 py-2 text-sm text-slate-400">
                          {h.purchasedAt
                            ? new Date(
                                h.purchasedAt.seconds * 1000
                              ).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-400">
                          {formatMillion(h.amount)}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-400">
                          {h.quantity}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Cards */}
          <div className="lg:w-7/12 flex flex-col gap-4">
            <h2 className="text-[22px] font-bold px-2">Available Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.length === 0 ? (
                <p className="text-slate-400 px-2">Loading cards...</p>
              ) : (
                cards.map((card) => {
                  const selectedCount = cart[card.id] || 0;
                  return (
                    <div
                      key={card.id}
                      className="flex flex-col bg-slate-800 rounded-xl border border-primary/50 ring-1 ring-primary/20 shadow-sm p-4 gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{card.cardName}</h3>
                          <p className="text-sm text-slate-400">
                            {card.description}
                          </p>
                        </div>
                        <div className="rounded-lg bg-yellow-900 p-2">
                          <span className="material-symbols-outlined text-yellow-400">
                            {card.icon || "card_giftcard"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold">₹{card.price}M</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrement(card.id)}
                            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {selectedCount}
                          </span>
                          <button
                            onClick={() => handleIncrement(card.id)}
                            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">
                        Available: {card.cardCount - selectedCount}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Purchase Summary */}
            <div className="sticky bottom-0 mt-4 p-4 bg-slate-800 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-slate-400">Total:</p>
                <p className="text-xl font-bold">₹{formatMillion(totalCost)}M</p>
              </div>
              <button
                onClick={handlePurchase}
                className={`px-6 py-2 rounded-lg text-white ${
                  Object.keys(cart).length === 0 || totalCost > userBalance
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }`}
                disabled={
                  Object.keys(cart).length === 0 || totalCost > userBalance
                }
              >
                Purchase ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
