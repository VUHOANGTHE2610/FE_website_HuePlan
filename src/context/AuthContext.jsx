import React, { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý trạng thái đăng nhập
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null: chưa đăng nhập, {userName, userEmail}: đã đăng nhập

  // Kiểm tra localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm đăng nhập: lưu thông tin người dùng
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Hàm đăng xuất: xóa thông tin người dùng
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};