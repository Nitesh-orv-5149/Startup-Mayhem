import db from "./config";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  orderBy,
  getDoc
} from "firebase/firestore";

// Listen to all available cards (cardCount > 0)
export const listenToAvailableCards = (callback) => {
  const cardsRef = collection(db, "cards");
  const q = query(cardsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const availableCards = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => b.cardCount - a.cardCount); // sort descending by cardCount

    callback(availableCards);
  });

  return unsubscribe;
};


// Update card count manually
export const updateCardCount = async (cardId, newCount) => {
  try {
    const cardRef = doc(db, "cards", cardId);
    await updateDoc(cardRef, { cardCount: newCount, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error updating card count:", error);
  }
};

// Get purchase history of a user
export const getCardHistory = (userId, callback) => {
  const purchasesRef = collection(db, "purchases");
  let q = query(purchasesRef, where("userId", "==", userId), orderBy("purchasedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const history = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(history);
  });

  return unsubscribe;
};

// Complete purchase: deduct stock, save purchase history
export const completePurchase = async (userId, cart, cards, userRef) => {
  const batch = writeBatch(db);

  const totalAmount = Object.entries(cart).reduce((sum, [cardId, count]) => {
    const card = cards.find((c) => c.id === cardId);
    return card ? sum + card.price * count : sum;
  }, 0);

  // Check user balance
  if (userRef) {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) throw new Error("User not found");
    const userData = userSnap.data();
    if (userData.balance < totalAmount) throw new Error("Insufficient balance");

    // Deduct balance
    batch.update(userRef, { balance: userData.balance - totalAmount });
  }

  const now = serverTimestamp();

  // Deduct stock and add purchase history
  Object.entries(cart).forEach(([cardId, count]) => {
    const cardDocRef = doc(db, "cards", cardId);
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.cardCount < count) throw new Error(`${card.cardName} insufficient stock`);
    
    batch.update(cardDocRef, { cardCount: card.cardCount - count });

    const purchaseRef = doc(collection(db, "purchases"));
    batch.set(purchaseRef, {
      userId,
      cardId,
      cardName: card.cardName,
      amount: card.price * count,
      quantity: count,
      purchasedAt: now,
    });
  });

  await batch.commit();
};

export const getCard = async (cardId) => {
  if (!cardId) return null;

  try {
    const docRef = doc(db, "cards", cardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`Card with ID ${cardId} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
};

export const getTeamCards = async (teamId) => {
  try {
    // 1️⃣ Fetch team document
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      console.log("Team not found");
      return [];
    }

    const teamData = teamSnap.data();
    const ownedCardIds = teamData.ownedCards || [];

    // 2️⃣ Fetch each card data
    const cardPromises = ownedCardIds.map((cardId) => getCard(cardId));
    const cards = await Promise.all(cardPromises);

    return cards; // array of full card objects
  } catch (error) {
    console.error("Error fetching team cards:", error);
    return [];
  }
};
