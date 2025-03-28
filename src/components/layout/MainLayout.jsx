import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - Thanh điều hướng trên cùng */}
      <nav className="bg-purple-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo HuePlan */}
          <h1 className="text-xl font-bold">HuePlan</h1>
          
          {/* Menu điều hướng (hiển thị trên màn hình lớn) */}
          <ul className="hidden md:flex space-x-4">
            <li><a href="/" className="hover:underline">Trang Chủ</a></li>
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          </ul>
        </div>
      </nav>
      
      {/* Main Content - Phần hiển thị nội dung chính */}
      <main className="flex-1 container mx-auto p-4">
        <Outlet /> {/* Hiển thị nội dung của từng trang */}
      </main>
      
      {/* Footer - Chân trang */}
      <footer className="bg-purple-900 text-white text-center p-4 mt-4">
        &copy; 2025 HuePlan. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
