import React, { useState, useEffect } from 'react';
import { getAllUser } from '../../services/UserService';
import { toast } from 'react-toastify';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: '',
    userEmail: '',
    role: 'client',
    userPassword: ''
  });

  // Lấy danh sách người dùng
  useEffect(() => {
    fetchUsers  ();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUser();
      setUsers(data);
    } catch (error) {
      toast.error(error);
    }
  };

  // Lọc người dùng theo tên
  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý thêm người dùng mới
  const handleAddUser = async () => {
    try {
      // TODO: Thêm service createUser
      // await createUser(newUser);
      toast.success('Thêm người dùng thành công');
      setShowAddModal(false);
      fetchUsers();
    } catch (error) {
      toast.error('Không thể thêm người dùng');
    }
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = async (userId) => {
    try {
      // TODO: Thêm service deleteUser
      // await deleteUser(userId);
      toast.success('Xóa người dùng thành công');
      fetchUsers();
    } catch (error) {
      toast.error('Không thể xóa người dùng');
    }
  };

  // Xử lý cập nhật người dùng
  const handleUpdateUser = async (userId, updatedData) => {
    try {
      // TODO: Thêm service updateUser
      // await updateUser(userId, updatedData);
      toast.success('Cập nhật người dùng thành công');
      fetchUsers();
    } catch (error) {
      toast.error('Không thể cập nhật người dùng');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Quản lý người dùng</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Thêm người dùng
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-purple-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Tên người dùng</th>
              <th className="px-4 py-2 border">Vai trò</th>
              <th className="px-4 py-2 border">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.user_ID} className="hover:bg-purple-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{user.userName}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleUpdateUser(user.user_ID)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.user_ID)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm người dùng */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Thêm người dùng mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                <input
                  type="text"
                  value={newUser.userName}
                  onChange={(e) => setNewUser({...newUser, userName: e.target.value})}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newUser.userEmail}
                  onChange={(e) => setNewUser({...newUser, userEmail: e.target.value})}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  value={newUser.userPassword}
                  onChange={(e) => setNewUser({...newUser, userPassword: e.target.value})}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="business">Business</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
