import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const CreateDebate = () => {
  const [theme, setTheme] = useState("");
  const [proSide, setProSide] = useState(""); // State for proSide
  const [conSide, setConSide] = useState(""); // State for conSide
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    // Ensure all fields are provided
    if (!theme || !proSide || !conSide) {
      alert("Please fill in all fields: Theme, Pro Side, and Con Side.");
      return;
    }

    try {
      // Make a POST request to your backend
      const response = await fetch("/api/debate/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, proSide, conSide }),
      });

      // Get the raw response body as text for debugging
      const rawData = await response.text();

      // Log the raw response data to inspect it (helpful for HTML error pages)
      console.log("Raw Response:", rawData);

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        alert("Error: " + rawData); // Show the raw HTML or error message from the backend
        return;
      }

      // Try parsing the response as JSON
      let data;
      try {
        data = JSON.parse(rawData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("An error occurred while processing the response.");
        return;
      }

      // Handle successful response
      if (response.ok) {
        navigate(`/debate-room/${data.debate._id}`);
      } else {
        // Handle error response
        alert(data.message || "Failed to create debate.");
      }
    } catch (err) {
      // Handle any errors during the fetch process
      console.error("Error creating debate:", err);
      alert("An error occurred while creating the debate.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Create a Debate</h2>

        {/* Theme Input */}
        <label className="block text-gray-700 mb-2">Select a Theme</label>
        <input
          type="text"
          placeholder="e.g. AI in Education"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Pro Side Input */}
        <label className="block text-gray-700 mb-2">Pro Side</label>
        <input
          type="text"
          placeholder="e.g. AI benefits education"
          value={proSide}
          onChange={(e) => setProSide(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Con Side Input */}
        <label className="block text-gray-700 mb-2">Con Side</label>
        <input
          type="text"
          placeholder="e.g. AI harms education"
          value={conSide}
          onChange={(e) => setConSide(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl transition-all"
        >
          Create Debate
        </button>
      </form>
    </div>
  );
};

export default CreateDebate;
