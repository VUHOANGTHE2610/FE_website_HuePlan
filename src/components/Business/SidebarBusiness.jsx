import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const SidebarBusiness = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/homedefault');
  };

  const menuItems = [
    {
      path: '/business',
      icon: <Home size={20} />,
      label: 'Tổng Quan',
    },
    {
      path: '/business/locations',
      icon: <MapPin size={20} />,
      label: 'Quản lý địa điểm',
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-purple-700">Business Dashboard</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors ${
              location.pathname === item.path ? 'bg-purple-50 text-purple-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
        >
          <span className="mr-3"><LogOut size={20} /></span>
          Đăng xuất
        </button>
      </nav>
    </div>
  );
};

export default SidebarBusiness; 