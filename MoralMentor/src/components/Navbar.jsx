import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-purple-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/" className="flex items-center space-x-2">
        <img src="/src/assets/mainLogo.png" alt="MoralMentor Logo" className="w-10 h-10" />
        <span className="text-lg font-semibold">MoralMentor</span>
        </Link>
      </h1>
      <ul className="flex items-center justify-center space-x-4">
        <li>
          <Link 
            to="/about"
            className={`hover:text-purple-300 ${location.pathname === "/about" ? "text-purple-400 font-semibold" : ""}`}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/flipcards"
            className={`hover:text-purple-300 ${location.pathname === "/flipcards" ? "text-purple-400 font-semibold" : ""}`}
          >
            FlipCards
          </Link>
        </li>
        <li>
          <Link 
            to="/hub"
            className={`hover:text-purple-300 ${location.pathname === "/hub" ? "text-purple-400 font-semibold" : ""}`}
          >
            Learning Hub
          </Link>
        </li>
        <li>
          <Link 
            to="/debates"
            className={`hover:text-purple-300 ${location.pathname === "/debates" ? "text-purple-400 font-semibold" : ""}`}
          >
            Debates
          </Link>
        </li>
        <li>
          <Link 
            to="/resources"
            className={`hover:text-purple-300 ${location.pathname === "/resources" ? "text-purple-400 font-semibold" : ""}`}
          >
            Resources
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard"
          >
            <img src="/src/assets/dashboard3.png" alt="Dashboard Logo" className="w-10 h-10" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
