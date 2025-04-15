import React from "react";

const Footer = () => {
  return (
    <footer className="relative text-white">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cau-trang-tien-footer.jpg')" }} // đặt ảnh nền ở đây
      >
        <div className="absolute inset-0 bg-purple-900 opacity-70"></div> {/* overlay tím */}
      </div>

      {/* Nội dung footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Logo và mô tả */}
          <div>
            <img src="/images/logo-white.png" alt="HuePlan" className="w-32 mb-4" />
            <p>HuePlan – Nền tảng lên kế hoạch du lịch tự túc tại Huế dễ dàng và nhanh chóng.</p>
          </div>

          {/* Menu liên kết */}
          <div>
            <h4 className="font-semibold mb-2">Khám phá</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-purple-300">Địa điểm nổi bật</a></li>
              <li><a href="#" className="hover:text-purple-300">Lịch trình mẫu</a></li>
              <li><a href="#" className="hover:text-purple-300">Ẩm thực Huế</a></li>
              <li><a href="#" className="hover:text-purple-300">Cẩm nang du lịch</a></li>
            </ul>
          </div>

          {/* Liên hệ / thông tin */}
          <div>
            <h4 className="font-semibold mb-2">Liên hệ</h4>
            <p>Email: support@hueplan.vn</p>
            <p>Địa chỉ: 123 Nguyễn Huệ, TP. Huế</p>
            <p>© 2025 HuePlan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
