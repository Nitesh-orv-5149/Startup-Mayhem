import db from "../firebase/config";
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
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

export function listenToTeamPhase(callback) {
  const teamRef = doc(db, "teams", "2jiA0NWYUhKGLSabejFf");
  const unsubscribe = onSnapshot(teamRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      callback(data.phase ?? 0); // <-- 🔥 this line calls callback()
    }
  });
  return unsubscribe;
}

// --- Update phase for all teams at once ---
export async function updatePhaseForAllTeams(newPhase) {
  const teamsRef = collection(db, "teams");
  const snapshot = await getDocs(teamsRef);

  const updatePromises = snapshot.docs.map((teamDoc) =>
    updateDoc(doc(db, "teams", teamDoc.id), { phase: newPhase })
  );

  await Promise.all(updatePromises);
  console.log(`✅ Updated all teams to ${newPhase}`);
}
