import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import badgeImage from "../assets/badge.png"; 
const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="bg-purple-50 flex-grow p-8">
        <h1 className="text-5xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats Section */}
        <div className="bg-purple-100 p-8 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            {/* Quizzes Completed */}
            <div className="bg-purple-200 p-6 rounded-lg w-full md:w-64">
              <h2 className="text-xl font-medium mb-2">
                No. of quizzes completed
              </h2>
              <p className="text-5xl font-bold">0</p>
            </div>
            
            {/* Learning Streak */}
            <div className="bg-purple-200 p-6 rounded-lg w-full md:w-64">
              <h2 className="text-xl font-medium mb-2">
                Learning Streak
              </h2>
              <p className="text-5xl font-bold">0 days</p>
            </div>
            
            {/* Badges Earned */}
            <div className="bg-purple-200 p-6 rounded-lg w-full md:w-64">
              <h2 className="text-xl font-medium mb-2">
                No. of badges earned
              </h2>
              <p className="text-5xl font-bold">0</p>
            </div>
          </div>
        </div>
        
        {/* Two Column Section for Badges and Best Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Badges Section */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Badges</h2>
            <div className="bg-purple-100 p-6 rounded-lg">
              <div className="flex justify-center space-x-4"> <h5 className="text-2xl">Earn points to unlock badges.</h5>
                {/* {[1, 2, 3].map((badge) => (
                  <div key={badge} className="flex-shrink-0">
                    <img 
                      src={badgeImage} 
                      alt={`Badge ${badge}`} 
                      className="w-24 h-24"
                    />
                  </div>
                ))} */}
              </div>
            </div>
          </div>
          
          {/* Best Lessons Section */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Best Lessons</h2>
            <div className="bg-purple-100 p-6 rounded-lg flex justify-center space-x-4"><h5 className="text-2xl">Complete a lesson or quiz.</h5>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plagiarism Lesson */}
                {/* <Link 
                  to="/lesson/plagiarism" 
                  className="bg-purple-200 p-4 rounded-lg text-center hover:bg-purple-300 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">📜</span>
                    <span className="text-2xl font-medium">Plagiarism</span>
                  </div>
                </Link>
                
                {/* Loyalty Lesson */}
                {/* <Link 
                  to="/lesson/loyalty" 
                  className="bg-purple-200 p-4 rounded-lg text-center hover:bg-purple-300 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">🤝</span>
                    <span className="text-2xl font-medium">Loyalty</span>
                  </div>
                </Link>
              </div>  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;