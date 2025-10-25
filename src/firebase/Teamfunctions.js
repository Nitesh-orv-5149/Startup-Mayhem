import db from "./config";
import { addDoc,updateDoc,deleteDoc,setDoc,serverTimestamp,runTransaction,arrayUnion } from "firebase/firestore";

import { doc, runTransaction, arrayUnion } from "firebase/firestore";
import db from "./firebase/config";

export const buyCard = async (teamId, cardId) => {
  const cardRef = doc(db, "cards", cardId);   // Specific card
  const teamRef = doc(db, "teams", teamId);   // Specific team

  try {
    await runTransaction(db, async (transaction) => {
      // Step 1: Read both documents
      const cardSnap = await transaction.get(cardRef);
      const teamSnap = await transaction.get(teamRef);

      if (!cardSnap.exists()) throw "Card not found";
      if (!teamSnap.exists()) throw "Team not found";

      const cardData = cardSnap.data();
      const teamData = teamSnap.data();

      const ownedCards = teamData.ownedCards || [];
      const isSold = cardData.sold || false;

      // Step 2: Check if the card is already bought
      if (ownedCards.includes(cardId) || isSold) {
        console.log("❌ Card already bought!");
        return false; // Optional: return for UI
      }

      // Step 3: Update both documents atomically
      transaction.update(teamRef, {
        ownedCards: arrayUnion(cardId)
      });

      transaction.update(cardRef, {
        sold: true
      });

      console.log(`✅ Card ${cardId} successfully bought!`);
      return true; // Optional: return success
    });
  } catch (e) {
    console.error("Transaction failed: ", e);
    return false;
  }
};



