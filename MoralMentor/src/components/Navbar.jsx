import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">MoralMentor</Link>
      </h1>
      <ul className="flex space-x-4">
        <li><Link to="/login" className="text-lg hover:text-purple-700">Login</Link></li>
        <li><Link to="/signup" className="text-lg hover:text-purple-700">Signup</Link></li>
        <li><Link to="/quiz" className="text-lg hover:text-purple-700">Quiz</Link></li>
        <li><Link to="/resources" className="text-lg hover:text-purple-700">Resources</Link></li>
        <li><Link to="/dashboard" className="text-lg hover:text-purple-700">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
