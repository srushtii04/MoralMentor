import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import discussionImage from "../assets/discussion-illustration.png";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="flex flex-grow bg-purple-100">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-6">
              Welcome to <span className="text-purple-600">MoralMentor</span>
            </h1>
            
            <p className="text-xl mb-6">
            Explore real-world ethical dilemmas, engage in interactive quizzes, discover timeless wisdom through our curated readings, and track your progress—all in one place.
            </p>
            
            <p className="text-xl mb-8">
              Learn, reflect, and grow with every decision you make!"{" "}
              <span className="text-yellow-400">✨</span>
            </p>
            
            <Link 
              to="/signup" 
              className="inline-block bg-purple-400 hover:bg-purple-500 text-center text-black font-medium py-3 px-12 rounded-md text-xl transition-colors"
            >
              Get Started
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <img 
                src={discussionImage}
                alt="People discussing ethical topics" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;