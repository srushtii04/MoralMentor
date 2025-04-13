import React, { useState } from "react";
import loginImage from "../assets/login.png";
import googleLogo from "../assets/google.png";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) newErrors.email = "Enter a valid email.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        // Redirect or state update
      }
    } catch (error) {
      alert("Login failed. Check credentials.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login not implemented yet.");
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-screen bg-[#F3E8FF] p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row-reverse items-center lg:items-stretch bg-transparent rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 px-4">
          <img
            src={loginImage}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 lg:pr-12 bg-white shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md p-3 mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md p-3 mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          <button
            className="w-full bg-black text-white py-3 rounded-md mb-4 text-lg font-semibold hover:bg-gray-800 transition"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="flex items-center mb-4">
            <hr className="w-full border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition"
            onClick={handleGoogleLogin}
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-4">
            New to Us?{" "}
            <a href="/signup" className="text-black font-bold hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
