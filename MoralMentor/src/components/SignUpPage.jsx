import React from "react";
import signupImg from "../assets/image.png"; 

const SignupPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#F3E8FF] p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <img src={signupImg} alt="Illustration" className="w-full h-auto" />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Sign Up
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email ID"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <input type="checkbox" className="mr-2" />
            <span>
              I agree to the
              <a href="#" className="text-purple-600 hover:underline">
                {" "}
                Terms of Service
              </a>
              ,
              <a href="#" className="text-purple-600 hover:underline">
                {" "}
                Privacy Policy
              </a>
              , and
              <a href="#" className="text-purple-600 hover:underline">
                {" "}
                Content Policies
              </a>
              .
            </span>
          </div>
          <button className="w-full py-3 rounded-md text-lg font-semibold transition group bg-gradient-to-r from-[#C9A7F8] to-[#A678F9] hover:from-[#A678F9] hover:to-[#C9A7F8] hover:opacity-90">
            Create Account
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?
            <a href="#" className="text-black font-bold hover:underline">
              {" "}
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
