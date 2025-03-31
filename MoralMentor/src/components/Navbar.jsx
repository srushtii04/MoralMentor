import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">MoralMentor</Link>
      </h1>
      <ul className="flex space-x-4">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/flipcards">FlipCards</Link></li>
        <li><Link to="/hub">Learning hub</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
