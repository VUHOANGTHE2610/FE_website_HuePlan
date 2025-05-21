import React, { useState } from 'react';

const duLieuDoanhNghiepDemo = [
  {
    user_Name: "Cửa hàng A",
    user_Password: "******",
    user_Email: "a@gmail.com",
    role: "business",
    business_ID: 1,
    business_photo: "https://via.placeholder.com/50",
    business_name: "Bún bò Huế A",
    business_location: "23 Lê Lợi, Huế",
    cost: 50000
  },
  {
    user_Name: "Cửa hàng B",
    user_Password: "******",
    user_Email: "b@gmail.com",
    role: "business",
    business_ID: 2,
    business_photo: "https://via.placeholder.com/50",
    business_name: "Cafe Không Gian B",
    business_location: "12 Nguyễn Huệ, Huế",
    cost: 30000
  },
  {
    user_Name: "Cửa hàng C",
    user_Password: "******",
    user_Email: "c@gmail.com",
    role: "business",
    business_ID: 3,
    business_photo: "https://via.placeholder.com/50",
    business_name: "Nem lụi Huế",
    business_location: "34 Trường Chinh, Huế",
    cost: 40000
  },
  // Thêm nhiều mẫu nữa nếu cần...
];

const BusinessManager = () => {
  const [duLieu, setDuLieu] = useState(duLieuDoanhNghiepDemo);
  const [timKiem, setTimKiem] = useState('');

  // Xoá doanh nghiệp
  const xuLyXoa = (id) => {
    if (confirm("Bạn có chắc muốn xoá doanh nghiệp này?")) {
      setDuLieu(prev => prev.filter(d => d.business_ID !== id));
    }
  };

  // Lọc theo tên hoặc email
  const duLieuLoc = duLieu.filter(d =>
    d.business_name.toLowerCase().includes(timKiem.toLowerCase()) ||
    d.user_Email.toLowerCase().includes(timKiem.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">📋 Quản lý doanh nghiệp</h2>

      <input
        type="text"
        placeholder="🔍 Tìm theo tên hoặc email..."
        value={timKiem}
        onChange={(e) => setTimKiem(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-purple-200">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="p-2 border">Tên người dùng</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Tên doanh nghiệp</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Chi phí</th>
              <th className="p-2 border">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {duLieuLoc.map((item) => (
              <tr key={item.business_ID} className="hover:bg-purple-50 transition">
                <td className="p-2 border">{item.user_Name}</td>
                <td className="p-2 border">{item.user_Email}</td>
                <td className="p-2 border">{item.role}</td>
                <td className="p-2 border">
                  <img src={item.business_photo} alt="avatar" className="w-10 h-10 rounded" />
                </td>
                <td className="p-2 border">{item.business_name}</td>
                <td className="p-2 border">{item.business_location}</td>
                <td className="p-2 border">{item.cost.toLocaleString()}đ</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => xuLyXoa(item.business_ID)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}

            {duLieuLoc.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  Không tìm thấy doanh nghiệp nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessManager;
