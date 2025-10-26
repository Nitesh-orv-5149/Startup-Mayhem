import db from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { startupsDefaultValues, actionCardsDefaultValues } from "../constants/defaultValues";

export async function resetToDefaultValues() {
  try {
    console.log("Reset started...");

    // --- Reset Startups ---
    const startupsSnapshot = await getDocs(collection(db, "teams"));
    const startupMap = new Map(
      startupsDefaultValues.map((item) => [item.startup.toLowerCase(), item])
    );

    for (const document of startupsSnapshot.docs) {
      const current = document.data();
      const defaults = startupMap.get(current.startup?.toLowerCase());
      if (!defaults) continue; // Skip if name doesn't match

      const updateFields = {
        budget: defaults.budget,
        cac: defaults.cac,
        ltv: defaults.ltv,
        runway: defaults.runway,
        ownedCards: defaults.ownedCards,
        phase: defaults.phase,
        password: defaults.password,
        cardCount: defaults.cardCount,
      };

      await updateDoc(doc(db, "teams", document.id), updateFields);
    }

    // --- Reset Action Cards ---
    const cardsSnapshot = await getDocs(collection(db, "cards"));
    const cardMap = new Map(
      actionCardsDefaultValues.map((item) => [item.cardName.toLowerCase(), item])
    );

    for (const document of cardsSnapshot.docs) {
      const current = document.data();
      const defaults = cardMap.get(current.cardName?.toLowerCase());
      if (!defaults) continue;

      const updateFields = {
        price: defaults.price,
        effect: defaults.effect,
        cardFunction: defaults.cardFunction,
        cardCount: defaults.cardCount,
      };

      await updateDoc(doc(db, "cards", document.id), updateFields);
    }

    console.log("✅ Reset completed successfully.");
  } catch (error) {
    console.error("❌ Reset failed:", error);
  }
}
