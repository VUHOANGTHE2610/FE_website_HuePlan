import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import SidebarAdmin from '../../components/Admin/SidebarAdmin';

const AdminHome = () => {
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng

  return (
    <div className="flex min-h-screen">
      {/* Sidebar trái */}
      <SidebarAdmin role={user?.role} />

      {/* Nội dung chính */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-purple-700">Trang Admin</h1>
        <p className="mt-2 text-gray-600">Chào mừng {user?.userName || 'Admin'} trở lại!</p>
        {/* TODO: Thêm nội dung dashboard tại đây */}
      </div>
    </div>
  );
};

export default AdminHome;
