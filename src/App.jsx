import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config"; // Adjust the path according to your file structure
import Login from "./Login";
import SignUp from "./SignUp";
import TVComponent from "./TVComponent";

const App = () => {
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* Redirect root to /login */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/signup" element={<SignUp />} /> {/* Sign-up route */}
        <Route
          path="/tv"
          element={user ? <TVComponent /> : <Navigate to="/login" />} // Protect TV route
        />
      </Routes>
    </Router>
  );
};

export default App;
