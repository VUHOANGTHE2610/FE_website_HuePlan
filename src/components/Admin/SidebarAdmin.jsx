import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ role }) => {
  return (
    <div className="w-64 bg-purple-800 text-white h-screen p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">📋 Bảng điều khiển</h2>

      {/* Mục chung cho tất cả roles */}
      <ul className="space-y-2">
        <li>
          <Link to="/admin/overview" className="hover:text-yellow-300">
            🏠 Tổng Quan
          </Link>
        </li>

        {/* Mục chỉ dành cho admin */}
        {role === 'admin' && (
          <li>
            <Link to="/admin/businessManeger" className="hover:text-yellow-300">
                quản lý doanh nghiệp
            </Link>
          </li>
        )}

        {/* Mục dùng chung cho admin và cộng tác viên */}
        {(role === 'admin' || role === 'congtacvien') && (
          <li>
            <Link to="/admin/posts" className="hover:text-yellow-300">
              ✏️ Quản lý bài viết
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
