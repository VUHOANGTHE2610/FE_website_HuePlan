// CommentSection.jsx
import React, { useState } from 'react';

export default function CommentSection({ initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim() !== '') {
      setComments([...comments, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="space-y-2">
      <p className="font-semibold">Bình luận:</p>
      <ul className="space-y-1">
        {comments.map((comment, index) => (
          <li key={index} className="text-sm text-gray-700 bg-gray-100 rounded p-2">
            {comment}
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Viết bình luận..."
          className="flex-1 border border-gray-300 rounded px-3 py-1"
        />
        <button
          onClick={handleAddComment}
          className="bg-purple-600 text-white px-3 py-1 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
