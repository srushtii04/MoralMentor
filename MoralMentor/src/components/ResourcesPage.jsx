import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import ethicsIntroImg from "../assets/ethics-intro.png";
import powerOfEthicsImg from "../assets/power-of-ethics.png";
import meditationsImg from "../assets/meditations.png";
import aristotleEthicsImg from "../assets/aristotle-ethics.png";

const ResourcesPage = () => {
  const books = [
    {
      id: 1,
      title: "Introduction to Philosophy: Ethics",
      author: "George Matthews",
      image: ethicsIntroImg,
      color: "bg-purple-700"
    },
    {
      id: 2,
      title: "The Power of Ethics",
      author: "Susan Liautaud",
      image: powerOfEthicsImg,
      color: "bg-white"
    },
    {
      id: 3,
      title: "Meditations",
      author: "Marcus Aurelius",
      image: meditationsImg,
      color: "bg-blue-900"
    },
    {
      id: 4,
      title: "An Introduction to Aristotle's Ethics",
      author: "Aristotle & Edward Moore",
      image: aristotleEthicsImg,
      color: "bg-yellow-200"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-purple-100 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Reference Guide: Books on Ethics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="flex flex-col">
                {/* Book Cover */}
                <div className="h-120 mb-4 overflow-hidden">
                  <img
                    src={book.image}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Download Button */}
                <Link
                  to={`/download/${book.id}`}
                  className="bg-purple-200 hover:bg-purple-300 text-black py-3 text-center font-medium mb-3 transition-colors"
                >
                  Download
                </Link>
                
                {/* Share Button */}
                <button
                  className="bg-green-200 hover:bg-green-300 text-black py-3 text-center font-medium transition-colors"
                  onClick={() => alert(`Share link for ${book.title} copied to clipboard!`)}
                >
                  Share
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;