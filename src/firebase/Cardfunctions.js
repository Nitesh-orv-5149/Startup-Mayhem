import db from "./config";
import { addDoc,updateDoc,deleteDoc,setDoc,serverTimestamp, collection, query, where, onSnapshot } from "firebase/firestore";

export async function createCard(cardData) {
  try {
    const cardSchema = {
      cardId: cardData.cardId,
      cardName: cardData.cardName,
      cardFunction: cardData.cardFunction,
      type: cardData.type,
      cardCount: cardData.cardCount,
      price: cardData.price,
      effect: cardData.effect,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "cards"), cardSchema);
    console.log("Card created with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating card:", error);
  }
};

/**
 * Listen to all available cards in real time
 * @param {Function} callback - function to handle updated card list
 * @returns {Function} unsubscribe - call to stop listening
 */
export const listenToAvailableCards = (callback) => {
  const cardsRef = collection(db, "cards");
  const q = query(cardsRef, where("cardCount", ">", 0));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const availableCards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(availableCards); // pass data to caller
  });

  return unsubscribe; // important to allow cleanup
};
