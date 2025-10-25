import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "./firebase/config";

export default function App() {
  useEffect(() => {
    const q = query(collection(db, "cards"), where("cardCount", ">", 0));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Available cards:", cards);
    });

    return () => unsubscribe();
  }, []);

  return <div>Check console for Firestore live cards 🔥</div>;
}
