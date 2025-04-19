import React, { useState } from 'react';

// Dữ liệu mẫu cho địa điểm, bao gồm tên và địa chỉ
const suggestedPlacesData = {
  'Món ăn': [
    { name: 'Bún bò Huế', address: '20 Lý Thường Kiệt, Huế' },
    { name: 'Cơm hến', address: '26 Trương Định, Huế' },
    { name: 'Nem lụi', address: '15 Nguyễn Huệ, Huế' },
  ],
  'Thức uống': [
    { name: 'Trà cung đình', address: '10 Đinh Tiên Hoàng, Huế' },
    { name: 'Chè Huế', address: '30 Lê Lợi, Huế' },
  ],
  'Check-in': [
    { name: 'Lăng Tự Đức', address: 'Thôn Thượng Ba, Huế' },
    { name: 'Đồi Vọng Cảnh', address: 'Phường Thủy Biều, Huế' },
    { name: 'Cầu Tràng Tiền', address: 'Sông Hương, Huế' },
  ],
};

// Component hiển thị danh sách địa điểm đề xuất
const SuggestedPlaces = ({ onSelectPlace }) => {  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Món ăn');

  // Lọc địa điểm theo từ khóa tìm kiếm
  const filteredPlaces = suggestedPlacesData[selectedCategory].filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Địa điểm đề xuất</h3>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm địa điểm..."
        className="w-full px-3 py-2 border rounded mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Danh mục */}
      <div className="flex gap-2 mb-3">
        {Object.keys(suggestedPlacesData).map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded ${
              category === selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách địa điểm */}
      <ul className="space-y-2">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded hover:bg-purple-100 cursor-pointer"
              onClick={() => onSelectPlace(place.name, place.address)} // Gửi thông tin địa điểm lên
            >
              {place.name} - {place.address}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">Không tìm thấy địa điểm.</li>
        )}
      </ul>
    </div>
  );
};

export default SuggestedPlaces;