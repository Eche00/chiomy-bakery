import React, { useState } from "react";
import { auth } from "../lib/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      let errorMessage = "An error occurred. Please try again later.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email address.";
      }
      console.error("Error resetting password:", error);
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
