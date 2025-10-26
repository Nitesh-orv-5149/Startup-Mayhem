import db  from "../firebase/config";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export const getAuth = async (startup, password) => {
  try {
    // 🔐 Hardcoded admin credentials
    const ADMIN_USERNAME = "ecell_admin_2025";
    const ADMIN_PASSWORD = "2025_ecell_admin";

    // 🧑‍💼 Admin Login
    if (startup === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return {
        success: true,
        message: "Admin login successful! 🎉",
        isAdmin: true,
        user: { startup: ADMIN_USERNAME, role: "admin" },
      };
    }

    // 🧍 Regular team login
    const teamsRef = collection(db, "teams");
    const q = query(
      teamsRef,
      where("startup", "==", startup),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // ✅ Get the first matching user
      const doc = querySnapshot.docs[0];
      const userData = { id: doc.id, ...doc.data() };

      return {
        success: true,
        message: "Login successful! 🎉",
        isAdmin: false,
        user: userData,
      };
    } else {
      return { success: false, message: "Invalid startup or password ❌" };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Error occurred, check console." };
  }
};



export const getAllTeams = async () => {
  try {
    const teamsRef = collection(db, "teams");
    const snapshot = await getDocs(teamsRef);

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()                                                                                                                                                                                      
    }));

    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

export const getTeam = async (teamId) => {
  try {
    if (!teamId) throw new Error("Invalid teamId");

    const teamRef = doc(db, "teams", teamId);
    const snapshot = await getDoc(teamRef);

    if (!snapshot.exists()) {
      console.warn(`Team with ID ${teamId} not found`);
      return null;
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Error fetching team:", error);
    return null;
  }
};