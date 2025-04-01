import { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([
    { user: "Shreya", text: "I think honesty is always the best policy!" },
    { user: "Amit", text: "Sometimes keeping a secret is important for trust." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { user: "You", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4 bg-purple-200 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold text-gray-900">Community Discussion</h3>
      <ul className="mt-2 space-y-2">
        {comments.map((comment, index) => (
          <li key={index} className="p-2 bg-white rounded-md shadow-sm">
            <strong className="text-purple-700">{comment.user}:</strong> {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="mt-3 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md text-gray-800 focus:ring-2 focus:ring-purple-400"
          placeholder="Add your opinion..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
