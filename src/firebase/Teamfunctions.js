import { doc, runTransaction, arrayUnion,onSnapshot, collection, query } from "firebase/firestore";
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

// Listen to all teams (sorted by teamScore or memberCount, whichever you use)
export const listenToAvailableTeams = (callback) => {
  const teamsRef = collection(db, "teams");
  const q = query(teamsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const teams = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => b.score - a.score); // sort descending by score (adjust field name)

    callback(teams);
  });

  return unsubscribe;
};


// 👂 Realtime listener for a single team's document
export const getTeam = (teamId, callback) => {
  try {
    const teamRef = doc(db, "teams", teamId);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      teamRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn("No such team document!");
          callback(null);
        }
      },
      (error) => {
        console.error("Error listening to team:", error);
        callback(null);
      }
    );

    return unsubscribe; // 👈 Let caller clean up listener
  } catch (error) {
    console.error("getTeam() failed:", error);
    return () => {}; // return dummy unsubscribe
  }
};
