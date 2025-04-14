import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  console.log("User state in Navbar:", user);

  return (
    <nav className="bg-purple-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/src/assets/mainLogo.png"
            alt="MoralMentor Logo"
            className="w-10 h-10"
          />
          <span className="text-lg font-semibold">MoralMentor</span>
        </Link>
      </h1>

      <ul className="flex items-center space-x-4 md:space-x-6">
        <li>
          <Link
            to="/about"
            className={`hover:text-purple-300 px-2 py-1 rounded-md transition-colors ${
              location.pathname === "/about" ? "text-purple-400 font-semibold" : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/flipcards"
            className={`hover:text-purple-300 px-2 py-1 rounded-md transition-colors ${
              location.pathname === "/flipcards" ? "text-purple-400 font-semibold" : ""
            }`}
          >
            FlipCards
          </Link>
        </li>
        <li>
          <Link
            to="/hub"
            className={`hover:text-purple-300 px-2 py-1 rounded-md transition-colors ${
              location.pathname === "/hub" ? "text-purple-400 font-semibold" : ""
            }`}
          >
            Learning Hub
          </Link>
        </li>
        <li>
          <Link
            to="/resources"
            className={`hover:text-purple-300 px-2 py-1 rounded-md transition-colors ${
              location.pathname === "/resources" ? "text-purple-400 font-semibold" : ""
            }`}
          >
            Resources
          </Link>
        </li>

        {user ? (
          <li className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setShowDropdown(!showDropdown)}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <FaUserCircle className="w-8 h-8 text-purple-300" />
              <span className="text-xs mt-1">{user.username}</span>
            </div>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-purple-100 hover:text-purple-800"
                  onClick={() => setShowDropdown(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-purple-100 hover:text-purple-800"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <div className="flex items-center space-x-2">
            <li>
              <Link
                to="/login"
                className="bg-white text-purple-800 hover:bg-purple-100 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </ul>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md text-center shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelLogout}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;