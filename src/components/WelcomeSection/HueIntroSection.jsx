// src/components/home/HueIntroSection.jsx
import React from "react";

const HueIntroSection = () => {
  return (
    <section className="py-16 px-4 md:px-16 bg-[#fef8ff] text-center">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">
        Vì sao nên khám phá Huế?
      </h2>
      <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
        Huế là thành phố cổ kính với vẻ đẹp dịu dàng, là cái nôi của văn hóa cung đình Việt Nam. 
        Từ những lăng tẩm cổ xưa, dòng sông Hương thơ mộng, đến nền ẩm thực đặc sắc, Huế mang đến 
        một hành trình khám phá đậm đà bản sắc mà bạn khó có thể tìm thấy ở nơi nào khác.
      </p>
    </section>
  );
};

export default HueIntroSection;
