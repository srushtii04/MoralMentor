import React, { useState } from "react";
import loginImage from "../assets/login.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) newErrors.email = "Enter a valid email.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data.token, response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        setLoginError("Invalid email or password. Please try again.");
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-screen bg-[#F3E8FF] p-6">
      <div className="w-full max-w-4xl h-[85vh] flex flex-col lg:flex-row-reverse items-stretch bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2">
          <img
            src={loginImage}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 px-8 py-12 flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">Login</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full border ${
                  errors.password || loginError ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {loginError && (
                <p className="text-red-500 text-sm mt-1">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            New to Us?{" "}
            <Link to="/signup" className="text-purple-600 font-bold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;