import React from 'react';

const TimeColumn = () => {
  const danhSachGio = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      danhSachGio.push(time);
    }
  }

  return (
    <div className="w-[80px] flex flex-col text-sm text-gray-600 border-r border-gray-300">
      {danhSachGio.map((gio, chiSo) => (
        <div key={chiSo} className="h-[20px] px-2 py-1 border-b border-gray-200">
          {gio}
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;