// src/components/home/CategorySection.jsx
import React from "react";

const categories = [
  {
    name: "Lăng tẩm",
    image: "/images/lang-tam.jpg",
    description: "Khám phá những công trình kiến trúc cổ kính độc đáo.",
  },
  {
    name: "Ẩm thực",
    image: "/images/am-thuc.jpg",
    description: "Trải nghiệm hương vị đặc sản Huế tinh tế và đậm đà.",
  },
  {
    name: "Văn hóa",
    image: "/images/van-hoa.jpg",
    description: "Tìm hiểu lễ hội, trang phục, di sản và lịch sử Huế.",
  },
  {
    name: "Cà phê",
    image: "/images/ca-phe.jpg",
    description: "Những quán cà phê view đẹp, chill giữa lòng Cố đô.",
  },
  {
    name: "Lịch trình đề xuất",
    image: "/images/lich-trinh.jpg",
    description: "Xem gợi ý lịch trình phù hợp với thời gian của bạn.",
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-purple-50 to-white">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
        Danh mục khám phá nổi bật
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-1 text-center">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">{cat.description}</p>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="#"
                className="px-4 py-1 text-sm bg-purple-600 text-white rounded-full shadow hover:bg-purple-700"
              >
                Khám phá
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
