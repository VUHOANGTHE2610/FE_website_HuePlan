import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, addCategory, updateCategory } from '../../services/categoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [category, setCategory] = useState({
    category_ID: 0,
    category_Name: '',
    category_Description: '',
  });
  const [loading, setLoading] = useState(false);

  // Lấy thông tin loại địa điểm khi ở chế độ chỉnh sửa
  useEffect(() => {
    if (isEditMode) {
      const fetchCategory = async () => {
        try {
          const data = await getCategoryById(id);
          setCategory(data);
        } catch (error) {
          toast.error('Lỗi khi tải dữ liệu loại địa điểm: ' + error.message);
          navigate('/admin/categories');
        }
      };
      fetchCategory();
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateCategory(category.category_ID, category);
        toast.success('Cập nhật loại địa điểm thành công!');
      } else {
        await addCategory(category);
        toast.success('Thêm loại địa điểm thành công!');
      }
      navigate('/admin/categories');
    } catch (error) {
      toast.error('Lỗi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        {isEditMode ? 'Chỉnh sửa loại địa điểm' : 'Thêm loại địa điểm mới'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Tên loại địa điểm</label>
            <input
              type="text"
              name="category_Name"
              value={category.category_Name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nhập tên loại địa điểm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mô tả</label>
            <textarea
              name="category_Description"
              value={category.category_Description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nhập mô tả"
              rows="4"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-400"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : (isEditMode ? 'Lưu' : 'Thêm')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm; 