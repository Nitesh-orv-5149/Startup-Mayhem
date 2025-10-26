import { doc, runTransaction, arrayUnion,onSnapshot, collection, query,getDocs,getDoc } from "firebase/firestore";
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
        cardCount: team.cardCount + 1
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

export const fetchTeams = async () => {
  try {
    const snapshot = await getDocs(collection(db, "teams"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
};

export const checkPhase = async (teamId, currentBoughtCount = 0) => {
  try {
    const teamRef = doc(db, "teams", teamId);
    const snapshot = await getDoc(teamRef);

    if (!snapshot.exists()) {
      return { canBuy: false, message: "Team not found.", maxAllowed: null };
    }

    const teamData = snapshot.data();
    const phase = teamData.phase ?? 0;

    switch (phase) {
      case 0:
        return { canBuy: false, message: "Phase 0: You cannot buy cards now.", maxAllowed: 0 };

      case 1:
        const remaining = Math.max(2 - currentBoughtCount, 0);
        if (remaining > 0) {
          return {
            canBuy: true,
            message: `Phase 1: You can buy ${remaining} more card(s).`,
            maxAllowed: 2
          };
        } else {
          return { canBuy: false, message: "Phase 1: You have reached your card limit.", maxAllowed: 2 };
        }

      case 3:
        return { canBuy: true, message: "Phase 3: No restrictions on buying cards.", maxAllowed: null };

      default:
        return { canBuy: false, message: "Unknown phase, cannot buy.", maxAllowed: null };
    }
  } catch (error) {
    console.error("Error checking phase:", error);
    return { canBuy: false, message: "Error checking phase.", maxAllowed: null };
  }
};