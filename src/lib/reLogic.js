import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const HandleRegisteration = async (formData) => {
  const { email, password, name, likes } = formData;

  try {
    const userCresidentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCresidentials.user;

    // setting user details to db
    await setDoc(doc(db, "users", user.uid), {
      email,
      name,
      likes,
    });
    console.log("User registered successfully:");
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
};
