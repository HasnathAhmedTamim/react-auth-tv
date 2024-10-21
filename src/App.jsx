import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config"; // Adjust the path according to your file structure

import TVComponent from "./TVComponent";

import NotFound from "./NotFound"; // Import a 404 component
import Loader from "./Loader"; // Import a loading spinner component
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";


const App = () => {
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser); // Update user state
        setLoading(false); // Set loading to false after checking auth state
      },
      (error) => {
        console.error("Auth state change error: ", error); // Handle error if needed
        setLoading(false); // Ensure loading is set to false in case of error
      }
    );

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  if (loading) {
    return <Loader />; // Use a loading component
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* Redirect root to /login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/tv" /> : <Login></Login>} // Redirect authenticated users
        />
        <Route path="/signup" element={<SignUp></SignUp>} /> {/* Sign-up route */}
        <Route
          path="/tv"
          element={user ? <TVComponent /> : <Navigate to="/login" />} // Protect TV route
        />
        <Route path="*" element={<NotFound />} /> {/* Handle 404 errors */}
      </Routes>
    </Router>
  );
};

export default App;
