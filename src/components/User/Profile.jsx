import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Common/Header';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_Name: '',
    user_Email: '',
  });

  // Giả lập dữ liệu, sau này sẽ gọi API GET /api/users/{user_id}
  useEffect(() => {
    const mockUser = {
      user_Name: 'Nguyen Van A',
      user_Email: 'nguyenvana@example.com',
    };
    setUser(mockUser);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Sau này sẽ gọi API PUT /api/users/{user_id}
    console.log('Cập nhật thông tin:', user);
    alert('Cập nhật thành công!');
  };

  const handleLogout = () => {
    // Sau này sẽ gọi API POST /api/auth/logout
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">Thông tin cá nhân</h1>
        <form onSubmit={handleUpdate} className="max-w-md">
          <div className="mb-4">
            <label className="block mb-1">Tên</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={user.user_Name}
              onChange={(e) => setUser({ ...user, user_Name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={user.user_Email}
              onChange={(e) => setUser({ ...user, user_Email: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Cập nhật
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;