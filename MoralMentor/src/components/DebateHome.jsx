import { Link } from "react-router-dom";
import { PlusCircle, Users } from "lucide-react";

const DebateHome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 text-white p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-6">Live Debates</h2>
        <p className="mb-6 text-gray-600">Choose how you want to participate</p>
        <div className="space-y-4">
          <Link
            to="/create-debate"
            className="flex items-center justify-center space-x-2 bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-xl transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create a Debate</span>
          </Link>
          <Link
            to="/join-debate"
            className="flex items-center justify-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 px-6 rounded-xl transition-all"
          >
            <Users className="w-5 h-5" />
            <span>Join a Debate</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DebateHome;
