import React, { useEffect, useState, useRef } from "react";

// Mảng chứa các ảnh nền
const images = [
  "/images/kinh-thanh-hue_1920-1080.jpg",
];

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  //  BỎ hiệu ứng tự động chuyển slide
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     goToNext();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // Chuyển tới slide kế tiếp
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Quay lại slide trước
  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Di chuyển slider mỗi khi currentIndex thay đổi
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    // Slider nền có chiều cao toàn màn hình
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Container chứa tất cả ảnh trượt */}
      <div
        ref={sliderRef}
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ width: `${images.length * 100}%` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
          >
            {/* ✅ Dùng object-cover để ảnh phủ toàn màn hình và không bị cắt cục bộ */}
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay nội dung chữ */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Lên Kế Hoạch Du Lịch Huế Tự Túc
        </h1>
        <p className="mb-6 max-w-xl text-lg">
          HuePlan giúp bạn dễ dàng xây dựng lịch trình khám phá Huế – từ điểm
          tham quan đến món ăn ngon, tất cả chỉ trong vài bước.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded">
          Bắt đầu lên kế hoạch
        </button>
      </div>

      {/* Nút điều hướng trái */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
      >
        ❮
      </button>

      {/* Nút điều hướng phải */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
      >
        ❯
      </button>
    </div>
  );
};

export default BackgroundSlider;
