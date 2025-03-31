import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">MoralMentor</Link>
      </h1>
      <ul className="flex space-x-4">
        <li>
          <Link 
            to="/about"
            className={`hover:text-purple-400 ${location.pathname === "/about" ? "text-purple-500 font-semibold" : ""}`}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/flipcards"
            className={`hover:text-purple-400 ${location.pathname === "/flipcards" ? "text-purple-500 font-semibold" : ""}`}
          >
            FlipCards
          </Link>
        </li>
        <li>
          <Link 
            to="/hub"
            className={`hover:text-purple-400 ${location.pathname === "/hub" ? "text-purple-500 font-semibold" : ""}`}
          >
            Learning Hub
          </Link>
        </li>
        <li>
          <Link 
            to="/quiz"
            className={`hover:text-purple-400 ${location.pathname === "/quiz" ? "text-purple-500 font-semibold" : ""}`}
          >
            Quiz
          </Link>
        </li>
        <li>
          <Link 
            to="/debates"
            className={`hover:text-purple-400 ${location.pathname === "/debates" ? "text-purple-500 font-semibold" : ""}`}
          >
            Debates
          </Link>
        </li>
        <li>
          <Link 
            to="/login"
            className={`hover:text-purple-400 ${location.pathname === "/login" ? "text-purple-500 font-semibold" : ""}`}
          >
            Login
          </Link>
        </li>
        <li>
          <Link 
            to="/signup"
            className={`hover:text-purple-400 ${location.pathname === "/signup" ? "text-purple-500 font-semibold" : ""}`}
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
