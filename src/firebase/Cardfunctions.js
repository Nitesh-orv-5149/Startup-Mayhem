import db from "./config";
import { addDoc,updateDoc,deleteDoc,setDoc,serverTimestamp } from "firebase/firestore";

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
