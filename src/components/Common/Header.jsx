
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/homedefault");
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 shadow-md bg-white border-b-4 border-purple-200 relative z-50">
      {/* Logo & Thương hiệu */}
      <div className="flex items-center space-x-3 group cursor-pointer">
        <img 
          src="/images/logo_v3.png" 
          alt="HuePlan Logo" 
          className="h-14 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(128,0,255,0.6)]"
        />
        <span className="text-2xl font-bold text-purple-800 tracking-wide group-hover:text-purple-700 transition-colors duration-300">
          HuePlan
        </span>
      </div>

      {/* Điều hướng */}
      <nav>
        <ul className="flex items-center space-x-6">
          {[
            { label: "Lịch trình", to: "/timeline" },
            { label: "BlogFeed", to: "/blogfeed" },   
          ].map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-purple-600 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Nếu đã đăng nhập, hiển thị tên người dùng và dropdown */}
          {user ? (
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 font-medium hover:text-purple-600"
              >
                {user.userName}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <Link
                    to="/profile-user"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Thông tin của bạn
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-purple-600 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 hover:from-purple-700 hover:to-purple-600 hover:shadow-lg"
                >
                  Đăng ký
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;