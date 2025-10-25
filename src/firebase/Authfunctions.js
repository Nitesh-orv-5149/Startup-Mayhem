import  db  from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getAuth = async (startup, password) => {
  try {
    const teamsRef = collection(db, "teams");
    const q = query(
      teamsRef,
      where("startup", "==", startup),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: true, message: "Login successful! 🎉" };
    } else {
      return { success: false, message: "Invalid startup or password ❌" };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Error occurred, check console." };
  }
};

// use like 
//const handleLogin = async (e) => {
//  e.preventDefault();
//    setMessage("Checking credentials...");
//
//    const result = await getAuth(startup, password);
//    setMessage(result.message);
//  };