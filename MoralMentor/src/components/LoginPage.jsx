import React from "react";
import loginImage from "../assets/login.png";
import googleLogo from "../assets/google.png";

const LoginPage = () => {
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
          <div className="flex items-center border border-gray-300 rounded-md p-3 mb-4">
            <span className="text-gray-600">🇮🇳 +91</span>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full outline-none pl-2"
            />
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md mb-4 text-lg font-semibold hover:bg-gray-800 transition">
            Request OTP
          </button>
          <div className="flex items-center mb-4">
            <hr className="w-full border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition">
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
          <p className="text-center text-gray-600 mt-4">
            New to Us?{" "}
            <span className="text-black font-bold cursor-pointer hover:underline">
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
