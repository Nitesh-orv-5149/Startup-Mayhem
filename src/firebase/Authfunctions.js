export const getAuth = async (startup, password) => {
  try {
    // Hardcoded admin credentials
    const ADMIN_USERNAME = "ecell_admin_2025";
    const ADMIN_PASSWORD = "2025_ecell_admin";

    if (startup === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return { success: true, message: "Admin login successful! 🎉", isAdmin: true };
    }

    // Regular team login
    const teamsRef = collection(db, "teams");
    const q = query(
      teamsRef,
      where("startup", "==", startup),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: true, message: "Login successful! 🎉", isAdmin: false };
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