import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DebateRoom = () => {
  const { id } = useParams(); // Get the debate ID from URL
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const response = await fetch(`/api/debates/${id}`);
        const data = await response.json();
        if (response.ok) {
          setDebate(data);
        } else {
          throw new Error(data.message || "Failed to fetch debate");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDebate();
    }
  }, [id]);

  if (loading) return <p>Loading debate...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{debate.theme}</h1>
      <p>Pro Side: {debate.proSide}</p>
      <p>Con Side: {debate.conSide}</p>
      <p>Status: {debate.status}</p>
      <ul>
        {debate.participants.length === 0 ? (
          <li>No participants yet</li>
        ) : (
          debate.participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DebateRoom;
