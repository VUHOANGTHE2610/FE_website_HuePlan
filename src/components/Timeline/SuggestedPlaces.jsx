// src/components/Timeline/SuggestedPlaces.jsx

import React, { useState } from 'react';

const diaDiemDemo = {
  'Mon an': ['Bun bo Hue', 'Com hen', 'Nem lui'],
  'Thuc uong': ['Tra cung dinh', 'Che Hue'],
  'Check-in': ['Lang Tu Duc', 'Doi Vong Canh', 'Cau Trang Tien'],
};

const DiaDiemDeXuat = () => {
  const [tuKhoa, setTuKhoa] = useState('');
  const [danhMucDangChon, setDanhMucDangChon] = useState('Mon an');

  const diaDiemLoc = diaDiemDemo[danhMucDangChon].filter(diaDiem =>
    diaDiem.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Địa điểm đề xuất</h3>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm địa điểm..."
        className="w-full px-3 py-2 border rounded mb-3"
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
      />

      {/* Danh mục */}
      <div className="flex gap-2 mb-3">
        {Object.keys(diaDiemDemo).map((danhMuc) => (
          <button
            key={danhMuc}
            className={`px-3 py-1 rounded ${
              danhMuc === danhMucDangChon ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setDanhMucDangChon(danhMuc)}
          >
            {danhMuc}
          </button>
        ))}
      </div>

      {/* Danh sách địa điểm */}
      <ul className="space-y-2">
        {diaDiemLoc.map((diaDiem, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 rounded hover:bg-purple-100 cursor-pointer"
          >
            {diaDiem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaDiemDeXuat;
