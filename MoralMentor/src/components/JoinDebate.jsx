import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JoinDebate = () => {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const res = await fetch("/api/debates");
        if (!res.ok) {
          throw new Error("Failed to fetch debates");
        }
        const data = await res.json();
        setDebates(data.debates || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to load debates. Please try again later.");
        setLoading(false);
      }
    };

    fetchDebates();
  }, []);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // converts to local time
  };

  const handleJoin = (debateId) => {
    navigate(`/debate-room/${debateId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 text-gray-800 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Available Debates</h2>

        {loading ? (
          <p className="text-center">Loading debates...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : debates.length === 0 ? (
          <p className="text-center text-gray-600">No debates available at the moment.</p>
        ) : (
          <div className="space-y-4">
            {debates.map((debate) => (
              <div
                key={debate._id}
                className="border border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{debate.theme}</h3>
                <p><strong>Pro Side:</strong> {debate.proSide}</p>
                <p><strong>Con Side:</strong> {debate.conSide}</p>
                <p><strong>Scheduled Time:</strong> {formatTime(debate.scheduledTime)}</p>
                <button
                  onClick={() => handleJoin(debate._id)}
                  className="mt-4 bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-xl"
                >
                  Join Debate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinDebate;
