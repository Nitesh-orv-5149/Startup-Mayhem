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

// Create a new card
export async function createCard(cardData) {
  try {
    const cardSchema = {
      cardId: cardData.cardId,
      cardName: cardData.cardName,
      description: cardData.description || "",
      type: cardData.type || "",
      cardCount: cardData.cardCount,
      price: cardData.price,
      icon: cardData.icon || "",
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "cards"), cardSchema);
    console.log("Card created with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating card:", error);
  }
}

// Listen to all available cards (cardCount > 0)
export const listenToAvailableCards = (callback) => {
  const cardsRef = collection(db, "cards");
  const q = query(cardsRef, where("cardCount", ">", 0));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const availableCards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
