import { doc, runTransaction, arrayUnion } from "firebase/firestore";
import db from "./config";

// teamUID and cardUID are the Firestore document IDs
export async function buyCard(teamUID, cardUID) {
  const cardRef = doc(db, "cards", cardUID);
  const teamRef = doc(db, "teams", teamUID);

  try {
    await runTransaction(db, async (transaction) => {
      // Step 1: Read both docs
      const cardSnap = await transaction.get(cardRef);
      const teamSnap = await transaction.get(teamRef);

      if (!cardSnap.exists()) throw new Error("Card not found");
      if (!teamSnap.exists()) throw new Error("Team not found");

      const card = cardSnap.data();
      const team = teamSnap.data();

      // Step 2: Validations
      if (card.cardCount <= 0) throw new Error("Card sold out");
      if (team.budget < card.price) throw new Error("Insufficient budget");
      if ((team.ownedCards || []).includes(cardUID))
        throw new Error("Already owned");

      // Step 3: Apply updates atomically
      transaction.update(cardRef, {
        cardCount: card.cardCount - 1,
      });

      transaction.update(teamRef, {
        budget: team.budget - card.price,
        ownedCards: arrayUnion(cardUID),
      });
    });

    console.log(`✅ ${teamUID} successfully bought ${cardUID}`);
    return true;
  } catch (error) {
    console.error("❌ Transaction failed:", error.message);
    return false;
  }
};


