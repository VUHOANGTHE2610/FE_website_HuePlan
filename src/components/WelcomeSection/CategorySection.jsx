// src/components/home/CategorySection.jsx
import React from "react";

const categories = [
  { name: "Lăng tẩm", image: "/images/lang-tam.jpg" },
  { name: "Ẩm thực", image: "/images/am-thuc.jpg" },
  { name: "Văn hóa", image: "/images/van-hoa.jpg" },
  { name: "Cà phê", image: "/images/ca-phe.jpg" },
  { name: "Lịch trình đề xuất", image: "/images/lich-trinh.jpg" },
];

const CategorySection = () => {
  return (
    <section className="py-12 px-4 md:px-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Danh mục khám phá
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 text-center font-medium">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
