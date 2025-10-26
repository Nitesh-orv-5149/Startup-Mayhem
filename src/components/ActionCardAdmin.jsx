export default function ActionCardAdmin({ card }) {

  return (
    <div className="border p-4 rounded-md flex flex-col gap-2 bg-gray-800 text-white">
      <h3 className="font-bold">{card.cardName}</h3>
      <p>Price: ₹{card.price}</p>
      <p>Available: {card.cardCount}</p>
      <p>Effect: {card.effect || "No effect"}</p>
    </div>
  );
};
