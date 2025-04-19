import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                { label: "About", to: "#" },
                { label: "Blog", to: "#" },
                { label: "Địa điểm HOT", to: "#" },
                { label: "Đăng nhập", to: "/login" },
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

            <li>
                <a
                    href="/register"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 hover:from-purple-700 hover:to-purple-600 hover:shadow-lg"
                >
                    Đăng ký
                </a>
            </li>
        </ul>
    </nav>
</header>

    );
};

export default Header;
