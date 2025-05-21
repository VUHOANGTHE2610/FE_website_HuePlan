
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getUser, updateUser } from '../../services/eventService';
import { toast } from 'react-toastify';

const ProfileUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    userName: '',
    userEmail: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.userId) {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          const response = await getUser(user.userId);
          setProfile({
            userName: response.user_Name,
            userEmail: response.user_Email,
            role: response.role,
          });
        } catch (error) {
          setError('Không thể tải thông tin người dùng.' + error.message);
          setProfile({
            userName: user.userName,
            userEmail: user.userEmail,
            role: user.role,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await updateUser({
        user_ID: user.userId,
        user_Name: profile.userName,
        user_Email: profile.userEmail,
        role: profile.role,
      });
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/homedefault');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">Thông tin cá nhân</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {isLoading ? (
          <div>Đang tải...</div>
        ) : (
          <form onSubmit={handleUpdate} className="max-w-md">
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Tên</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={profile.userName}
                onChange={(e) => setProfile({ ...profile, userName: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={profile.userEmail}
                onChange={(e) => setProfile({ ...profile, userEmail: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Vai trò</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={profile.role}
                disabled
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
