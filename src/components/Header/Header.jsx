import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex justify-between items-center p-2 shadow-md bg-white">
            {/* Logo & Thương hiệu */}
            <div className="flex items-center space-x-2">
                <img 
                    src="/images/logo_v3.png" 
                    alt="HuePlan Logo" 
                    className="h-14 w-auto drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
                <span className="text-xl font-semibold text-purple-800 tracking-wide">HuePlan</span>
            </div>

            {/* Điều hướng */}
            <nav>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link to="/calendar" className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300">
                            Lịch trình
                        </Link>
                    </li>
                    <li>
                        <a href="" className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="" className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="" className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300">
                            Địa điểm HOT
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300">
                            Đăng nhập
                        </a>
                    </li>
                    <li>
                        <a href="/register" 
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg">
                            Đăng ký
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
