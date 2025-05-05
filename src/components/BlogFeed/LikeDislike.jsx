import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function LikeDislike({ initialLikes, initialDislikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  return (
    <div className="flex items-center space-x-4">
      <button onClick={handleLike} className="flex items-center space-x-1 text-green-600">
        <ThumbsUp size={18} />
        <span>{likes}</span>
      </button>
      <button onClick={handleDislike} className="flex items-center space-x-1 text-red-600">
        <ThumbsDown size={18} />
        <span>{dislikes}</span>
      </button>
    </div>
  );
}
