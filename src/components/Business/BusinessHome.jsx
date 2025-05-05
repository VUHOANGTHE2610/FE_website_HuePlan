import React, { useState, useContext } from 'react';
import BusinessSidebar from './BusinessSidebar'; 
import TrangDoanhNghiep from './TrangDoanhNghiep';
import QuanLyBlog from './QuanLyBlog';
import ThongTinCaNhan from './ThongTinCaNhan';
import { AuthContext } from '../../context/AuthContext';
import XacNhanDangXuatModal from '../Common/XacNhanDangXuatModal';

const BusinessHome = () => {
  const [tabDangChon, setTabDangChon] = useState('trang');
  const [hienModalDangXuat, setHienModalDangXuat] = useState(false);
  const { logout } = useContext(AuthContext);

  const renderNoiDung = () => {
    switch (tabDangChon) {
      case 'trang':
        return <TrangDoanhNghiep />;
      case 'blog':
        return <QuanLyBlog />;
      case 'thongtin':
        return <ThongTinCaNhan />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <BusinessSidebar
        tabDangChon={tabDangChon}
        chonTab={setTabDangChon}
        onDangXuat={() => setHienModalDangXuat(true)}
      />

      {/* Nội dung */}
      <div className="flex-1 p-6 bg-white shadow-inner">
        {renderNoiDung()}
      </div>

      {/* Modal xác nhận đăng xuất */}
      {hienModalDangXuat && (
        <XacNhanDangXuatModal
          hien={hienModalDangXuat}
          onDong={() => setHienModalDangXuat(false)}
          onXacNhan={() => {
            logout();
            window.location.href = "/homedefault";
          }}
        />
      )}
    </div>
  );
};

export default BusinessHome;
