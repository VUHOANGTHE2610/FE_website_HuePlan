import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

const dummyPosts = [
  {
    id: 1,
    author: 'Nguyễn Văn A',
    avatar: '/avatar1.png',
    content: 'Hôm nay Huế thật đẹp!',
    time: '2 giờ trước',
    comments: ['Đồng ý!', 'Đẹp thật đấy.'],
    likes: 5,
    dislikes: 1,
  },
];

export default function BlogFeed() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Nút quay về trang chủ */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-700">Blog</h1>
        <button
          onClick={() => navigate('/homedefault')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Trang chủ
        </button>
      </div>

      {/* Danh sách bài viết */}
      {dummyPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
