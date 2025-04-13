import React, { useState } from "react";
import signupImg from "../assets/image.png";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    if (!passwordRegex.test(password)) newErrors.password = "Password must be at least 6 characters and include numbers and letters.";
    if (!termsAccepted) newErrors.terms = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username: name,
        email,
        password,
      });

      if (response.status === 200) {
        alert("Account created successfully!");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed, please try again.");
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

          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email ID"
            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md mb-2 outline-none focus:ring-2 focus:ring-purple-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
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
            className="w-full py-3 rounded-md text-lg font-semibold transition group bg-gradient-to-r from-[#C9A7F8] to-[#A678F9] hover:from-[#A678F9] hover:to-[#C9A7F8] hover:opacity-90"
            onClick={handleSignup}
          >
            Create Account
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?
            <a href="/login" className="text-black font-bold hover:underline"> Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
