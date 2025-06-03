import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAllLocations, deleteLocation } from '../../services/locationService';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Lấy danh sách địa điểm
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const data = await getAllLocations();
      setLocations(data);
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra khi tải dữ liệu!');
    }
  };

  // Xử lý xóa địa điểm
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa địa điểm này?')) {
      try {
        await deleteLocation(id);
        fetchLocations();
        alert('Xóa địa điểm thành công!');
      } catch (error) {
        alert(error.message || 'Có lỗi xảy ra!');
      }
    }
  };

  // Lọc danh sách theo tìm kiếm
  const filteredLocations = locations.filter((loc) =>
    loc.location_Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">📍 Quản lý địa điểm</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên địa điểm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => navigate('/admin/locations/new')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Thêm địa điểm
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-purple-200">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="p-2 border">Tên địa điểm</th>
              <th className="p-2 border">Mô tả</th>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Chi phí</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((loc) => (
              <tr key={loc.location_ID} className="hover:bg-purple-50 transition">
                <td className="p-2 border">{loc.location_Name}</td>
                <td className="p-2 border">{loc.location_Description}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    {(loc.location_Photos || []).map((url, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8080${url}`}
                        alt="location"
                        className="w-10 h-10 rounded object-cover"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-2 border">{loc.location_Address}</td>
                <td className="p-2 border">{loc.location_Cost.toLocaleString()}đ</td>
                <td className="p-2 border">{loc.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => navigate(`/admin/locations/edit/${loc.location_ID}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(loc.location_ID)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {filteredLocations.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">
                  Không tìm thấy địa điểm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationManager;