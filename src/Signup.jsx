// src/SignUp.jsx

import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase.config"; // Import your Firebase config and Google provider
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Swal from "sweetalert2"; // Import SweetAlert2

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // Show success alert
      Swal.fire({
        title: "Account Created!",
        text: "You have successfully created an account.",
        icon: "success",
        confirmButtonText: "OK",
      });
      // Redirect to TV component after successful SignUp
      navigate("/tv");
    } catch (err) {
      setError("Failed to create account. Please try again.");
      // Show error alert
      Swal.fire({
        title: "SignUp Failed!",
        text: "Failed to create account. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Sign in with Google
      await signInWithPopup(auth, googleProvider);
      // Show success alert
      Swal.fire({
        title: "Account Created!",
        text: "You have successfully signed up with Google.",
        icon: "success",
        confirmButtonText: "OK",
      });
      // Redirect to TV component after successful SignUp
      navigate("/tv");
    } catch (err) {
      console.error("Google SignUp error: ", err);
      setError("Failed to create account with Google. Please try again.");
      // Show error alert
      Swal.fire({
        title: "SignUp Failed!",
        text: "Failed to create account with Google. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md transition-all transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-red-800 mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign up for a new account
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 text-gray-700"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 text-gray-700"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">Or</p>
          <button
            onClick={handleGoogleSignUp}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 mt-4"
          >
            Sign Up with Google
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-purple-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
