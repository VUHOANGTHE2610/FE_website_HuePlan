import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getLocationsByUserId, deleteLocation } from '../../services/locationService';
import { getAllCategories } from '../../services/categoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessLocationManager = () => {
  const { user } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Lấy danh sách loại địa điểm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Lỗi khi tải danh sách loại địa điểm: ' + error.message);
      }
    };
    fetchCategories();
  }, []);

  // Lấy danh sách địa điểm của user
  useEffect(() => {
    if (user && user.userId) {
      fetchLocations();
    }
  }, [user]);

  const fetchLocations = async () => {
    try {
      const data = await getLocationsByUserId(user.userId);
      setLocations(data);
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi tải dữ liệu!');
    }
  };

  // Xử lý xóa địa điểm
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa địa điểm này?')) {
      try {
        await deleteLocation(id);
        fetchLocations();
        toast.success('Xóa địa điểm thành công!');
      } catch (error) {
        toast.error(error.message || 'Có lỗi xảy ra!');
      }
    }
  };

  // Lọc danh sách theo tìm kiếm
  const filteredLocations = locations.filter((loc) =>
    loc.location_Name.toLowerCase().includes(search.toLowerCase())
  );

  // Hàm lấy tên loại địa điểm từ category_ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Chưa phân loại';
    const category = categories.find(cat => cat.category_ID === categoryId);
    return category ? category.category_Name : 'Chưa phân loại';
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Quản lý địa điểm</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên địa điểm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => navigate('/business/locations/new')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Thêm địa điểm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-purple-200">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="p-2 border">Tên địa điểm</th>
              <th className="p-2 border">Loại địa điểm</th>
              <th className="p-2 border">Mô tả</th>
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
                <td className="p-2 border">{getCategoryName(loc.category_ID)}</td>
                <td className="p-2 border max-w-xs truncate">{loc.location_Description}</td>
                <td className="p-2 border">{loc.location_Address}</td>
                <td className="p-2 border">{loc.location_Cost.toLocaleString()}đ</td>
                <td className="p-2 border">{loc.status ? 'Hoạt động' : 'Chờ duyệt'}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => navigate(`/business/locations/edit/${loc.location_ID}`)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessLocationManager; 