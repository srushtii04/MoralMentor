import React, { useState } from "react";
import signupImg from "../assets/image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!username.trim()) newErrors.username = "Username is required.";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    if (!passwordRegex.test(password))
      newErrors.password = "Password must be at least 6 characters and include numbers and letters.";
    if (!termsAccepted) newErrors.terms = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    setEmailExistsError(false);
    setSuccessMessage("");
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("✅ Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message;

      if (error.response?.status === 400 && errMsg === "Email already in use") {
        setEmailExistsError(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: errMsg || "Something went wrong. Please try again.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#F3E8FF] p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <img src={signupImg} alt="Illustration" className="w-full h-auto" />
        </div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">Sign Up</h2>

          {successMessage && (
            <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p>
          )}

          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
          )}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              className={`w-full p-3 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username}</p>}

            <input
              type="email"
              placeholder="Email ID"
              autoComplete="email"
              className={`w-full p-3 border ${errors.email || emailExistsError ? "border-red-500" : "border-gray-300"} rounded-md mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
            {emailExistsError && (
              <p className="text-red-500 text-sm mb-2">
                Email already exists. Please <Link to="/login" className="font-bold text-purple-600">log in</Link> instead or use a different email.
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <span>
                I agree to the
                <a href="#" className="text-purple-600 hover:underline"> Terms of Service</a>,
                <a href="#" className="text-purple-600 hover:underline"> Privacy Policy</a>,
                and <a href="#" className="text-purple-600 hover:underline"> Content Policies</a>.
              </span>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mb-4">{errors.terms}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-md text-lg font-semibold transition group bg-gradient-to-r from-[#C9A7F8] to-[#A678F9] hover:from-[#A678F9] hover:to-[#C9A7F8] hover:opacity-90 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?
            <Link to="/login" className="text-purple-600 font-bold hover:underline ml-1"> Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;