// // src/Login.jsx

// import React, { useState } from "react";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase.config";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire({
//         title: "Logged In!",
//         text: "You have successfully logged in.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//       navigate("/tv");
//     } catch (err) {
//       setError(err.message);
//       Swal.fire({
//         title: "Login Failed!",
//         text: err.message,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithPopup(auth, googleProvider);
//       Swal.fire({
//         title: "Logged In!",
//         text: "You have successfully logged in with Google.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//       navigate("/tv");
//     } catch (err) {
//       console.error("Google Login error: ", err);
//       setError(err.message);
//       Swal.fire({
//         title: "Login Failed!",
//         text: err.message,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md transition-all transform hover:scale-105 hover:shadow-2xl">
//         <h2 className="text-4xl font-extrabold text-center text-red-800 mb-6">
//           Login
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Welcome back! Please log in to your account.
//         </p>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="relative">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 text-gray-700"
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 text-gray-700"
//               placeholder="Password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
//             disabled={loading}
//           >
//             {loading ? "Logging In..." : "Login"}
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-gray-500">Or</p>
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 mt-4"
//             disabled={loading}
//           >
//             {loading ? "Logging In..." : "Login with Google"}
//           </button>
//         </div>

//         <div className="text-center mt-6">
//           <p className="text-gray-500">
//             Don't have an account?{" "}
//             <a href="/signup" className="text-purple-500 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
