import React from 'react';
import PostCard from './PostCard';
import Header from '../Common/Header';

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
  return (
     <div className="min-h-screen bg-gray-100"><Header />
     
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          {/* Nút quay về trang chủ */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-purple-700">Blog</h1>
          </div>

          {/* Danh sách bài viết */}
          {dummyPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
     </div>
  );

}
