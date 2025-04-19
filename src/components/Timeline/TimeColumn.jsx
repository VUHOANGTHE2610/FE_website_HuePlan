import React from 'react';

// Hiển thị danh sách mốc giờ từ 0h -> 23h
const TimeColumn = () => {
  const danhSachGio = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  return (
    <div className="w-[80px] flex flex-col text-sm text-gray-600 border-r border-gray-300">
      {danhSachGio.map((gio, chiSo) => (
        <div key={chiSo} className="h-[80px] px-2 py-1 border-b border-gray-200">
          {gio}
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;
