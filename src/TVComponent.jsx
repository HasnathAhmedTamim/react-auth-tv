import React, { useState } from "react"; // Import useState to manage theme
import { auth } from "./firebase.config"; // Ensure you import Firebase auth
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2"; // Import SweetAlert2

const TVComponent = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Hook to get the current user
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark/light mode

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel!",
    });

    // If the user confirmed the logout, proceed with signing out
    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire("Logged out!", "You have been logged out.", "success"); // Optional success message
        navigate("/login"); // Redirect to login after logging out
      } catch (error) {
        console.error("Error signing out: ", error);
        Swal.fire("Error!", "There was an error signing you out.", "error"); // Optional error message
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the dark mode state
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <header className="flex justify-between items-center w-full p-4  shadow-md">
        <h1 className="text-2xl font-bold">My TV</h1>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"} {/* Toggle button */}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ml-4"
          >
            Logout
          </button>
        </div>
      </header>
      {/* Iframe to display external content */}
      <iframe
        src="//stream.crichd.sc/update/willowcricket.php"
        title="Cricket Stream"
        width="60%"
        height="800px"
        allowFullScreen
        allow="encrypted-media"
        className="mt-8"
      ></iframe>
    </div>
  );
};

export default TVComponent;
