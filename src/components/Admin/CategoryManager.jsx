import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../services/categoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Lấy danh sách loại địa điểm
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi tải dữ liệu!');
    }
  };

  // Xử lý xóa loại địa điểm
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa loại địa điểm này?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
        toast.success('Xóa loại địa điểm thành công!');
      } catch (error) {
        toast.error(error.message || 'Có lỗi xảy ra!');
      }
    }
  };

  // Lọc danh sách theo tìm kiếm
  const filteredCategories = categories.filter((cat) =>
    cat.category_Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Quản lý loại địa điểm</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên loại địa điểm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => navigate('/admin/categories/new')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Thêm loại địa điểm
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-purple-200">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="p-2 border">Tên loại địa điểm</th>
              <th className="p-2 border">Mô tả</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.category_ID} className="hover:bg-purple-50 transition">
                <td className="p-2 border">{cat.category_Name}</td>
                <td className="p-2 border">{cat.category_Description}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => navigate(`/admin/categories/edit/${cat.category_ID}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(cat.category_ID)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  Không tìm thấy loại địa điểm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManager; 