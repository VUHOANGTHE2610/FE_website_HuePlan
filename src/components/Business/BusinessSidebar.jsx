import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const BusinessSidebar = ({ tabDangChon, chonTab, onDangXuat }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-purple-100 p-4 shadow-md flex flex-col">
      {/* Avatar doanh nghiệp */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-purple-300 mx-auto mb-2" />
        <h2 className="font-bold text-purple-800">{user?.userName || 'Doanh nghiệp'}</h2>
        <p className="text-sm text-gray-500">{user?.userEmail}</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => chonTab('trang')}
          className={`w-full text-left px-4 py-2 rounded ${
            tabDangChon === 'trang'
              ? 'bg-purple-600 text-white'
              : 'hover:bg-purple-200 text-purple-700'
          }`}
        >
          Trang Doanh Nghiệp
        </button>

        <button
          onClick={() => chonTab('blog')}
          className={`w-full text-left px-4 py-2 rounded ${
            tabDangChon === 'blog'
              ? 'bg-purple-600 text-white'
              : 'hover:bg-purple-200 text-purple-700'
          }`}
        >
          Quản lý Blog
        </button>

        <button
          onClick={() => chonTab('thongtin')}
          className={`w-full text-left px-4 py-2 rounded ${
            tabDangChon === 'thongtin'
              ? 'bg-purple-600 text-white'
              : 'hover:bg-purple-200 text-purple-700'
          }`}
        >
          Thông tin
        </button>
      </nav>

      {/* Đăng xuất */}
      <button
        onClick={onDangXuat}
        className="mt-6 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default BusinessSidebar;
