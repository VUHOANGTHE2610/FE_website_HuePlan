// PostCard.jsx
import React from 'react';
import CommentSection from './CommentSection';
import LikeDislike from './LikeDislike';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      {/* Header: Avatar + Tên + Thời gian */}
      <div className="flex items-center space-x-3">
        <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <div className="text-gray-800">{post.content}</div>

      {/* Like / Dislike */}
      <LikeDislike initialLikes={post.likes} initialDislikes={post.dislikes} />

      {/* Bình luận */}
      <CommentSection initialComments={post.comments} />
    </div>
  );
}
