// src/components/home/FeaturedPlaces.jsx
import React from "react";

const places = [
  {
    name: "Đại Nội Huế",
    image: "/images/kinh-thanh-hue.jpg",
    description: "Biểu tượng lịch sử triều Nguyễn, điểm đến không thể bỏ lỡ.",
  },
  {
    name: "Lăng Minh Mạng",
    image: "/images/MinhMang.jpg",
    description: "Lăng tẩm cổ kính với kiến trúc hài hòa cùng thiên nhiên.",
  },
  {
    name: "Chùa Thiên Mụ",
    image: "/images/KinhThanh2.jpg",
    description: "Ngôi chùa nổi tiếng bên dòng sông Hương thơ mộng.",
  },
];

const FeaturedPlaces = () => {
  return (
    <section className="py-12 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Địa điểm nổi bật
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place, index) => (
          <div key={index} className="rounded overflow-hidden shadow-lg">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
              <p className="text-gray-600 text-sm">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaces;
