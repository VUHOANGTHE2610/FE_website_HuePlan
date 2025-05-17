// src/components/home/FeaturedPlaces.jsx
import React from "react";
import { motion } from "framer-motion";

const places = [
  {
    name: "Đại Nội Huế",
    image: "/images/kinh-thanh-hue.jpg",
    description: "Biểu tượng lịch sử triều Nguyễn, điểm đến không thể bỏ lỡ. Bên trong Đại Nội có hàng chục cung điện, điện thờ, thư viện, hồ sen… mỗi góc đều lưu giữ dấu ấn nghìn năm cố đô.",
  },
  {
    name: "Lăng Minh Mạng",
    image: "/images/MinhMang.jpg",
    description: "Lăng tẩm cổ kính với kiến trúc hài hòa cùng thiên nhiên. Khu lăng mộ được bao quanh bởi rừng thông, hồ nước, tạo không gian tĩnh lặng, thanh bình.",
  },
  {
    name: "Chùa Thiên Mụ",
    image: "/images/KinhThanh2.jpg",
    description: "Ngôi chùa nổi tiếng bên dòng sông Hương thơ mộng. Tháp Phước Duyên 7 tầng cao vút, view ra sông Hương – lý tưởng cho những bức ảnh hoàng hôn.",
  },
];

const variants = {
  left: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
};

export default function FeaturedPlaces() {
  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-purple-50 to-white">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">
        Địa điểm nổi bật
      </h2>
      <p className="max-w-3xl mx-auto text-center text-purple-600 mb-12 leading-relaxed">
        Cố đô Huế lưu giữ biết bao công trình lịch sử, văn hóa và tôn giáo.  
        Hãy cùng khám phá từng không gian, từ hoàng cung tráng lệ đến chốn linh thiêng bên bờ sông Hương.  
        Mỗi điểm đến là một câu chuyện, một trải nghiệm không thể nào quên!
      </p>

      <div className="space-y-16">
        {places.map((place, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center md:justify-between ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg"
                variants={isEven ? variants.left : variants.right}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0 md:px-10"
                variants={isEven ? variants.right : variants.left}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  {place.name}
                </h3>
                <p className="text-purple-600 leading-relaxed mb-4">
                  {place.description}
                </p>
                <a
                  href="/register"
                  className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
                >
                  Lên lịch trình
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
