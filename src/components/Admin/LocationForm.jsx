import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getLocationById, addLocation, updateLocation, uploadPhoto, deletePhoto } from '../../services/locationService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [location, setLocation] = useState({
    location_ID: 0,
    location_Name: '',
    location_Description: '',
    location_Photos: [],
    location_Cost: 0,
    location_Address: '',
    createBy: 'Admin',
    user_ID: 0,
    status: true,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cập nhật user_ID và createBy khi user thay đổi
  useEffect(() => {
    if (user) {
      setLocation(prev => ({
        ...prev,
        user_ID: user.userId || 0,
        createBy: user.userName || 'Admin',
      }));
    }
  }, [user]);

  // Lấy thông tin địa điểm khi ở chế độ chỉnh sửa
  useEffect(() => {
    if (isEditMode) {
      const fetchLocation = async () => {
        try {
          const data = await getLocationById(id);
          setLocation(data);
          setPreviewUrls(data.location_Photos.map(photo => ({
            id: photo.id,
            url: photo.url.includes('http') ? photo.url : `http://localhost:8080${photo.url}`,
          })) || []);
        } catch (error) {
          toast.error('Lỗi khi tải dữ liệu địa điểm: ' + error.message);
          navigate('/admin/locations');
        }
      };
      fetchLocation();
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} không phải ảnh!`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // Sửa lỗi typo: getSize -> size
        toast.error(`File ${file.name} vượt quá 5MB!`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles]); // Thêm file mới vào danh sách
    const newUrls = validFiles.map(file => ({ id: null, url: URL.createObjectURL(file) }));
    setPreviewUrls(prev => [...prev, ...newUrls]); // Cập nhật preview
  };

  const handleDeletePhoto = async (photo) => {
    try {
      if (photo.id) {
        await deletePhoto(photo.id);
        setLocation(prev => ({
          ...prev,
          location_Photos: prev.location_Photos.filter(p => p.id !== photo.id),
        }));
        setPreviewUrls(prev => prev.filter(p => p.id !== photo.id));
        toast.success('Xóa ảnh thành công!');
      } else {
        setPreviewUrls(prev => prev.filter(p => p.url !== photo.url));
        setSelectedFiles(prev => prev.filter(f => URL.createObjectURL(f) !== photo.url));
        toast.success('Đã xóa ảnh khỏi danh sách!');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa ảnh: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      toast.error('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('location', JSON.stringify({
        location_ID: location.location_ID,
        location_Name: location.location_Name,
        location_Description: location.location_Description,
        location_Photos: location.location_Photos,
        location_Cost: parseFloat(location.location_Cost),
        location_Address: location.location_Address,
        createBy: location.createBy,
        user_ID: user.userId,
        status: location.status,
      }));
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      if (isEditMode) {
        await updateLocation(location.location_ID, {
          location_ID: location.location_ID,
          location_Name: location.location_Name,
          location_Description: location.location_Description,
          location_Cost: parseFloat(location.location_Cost),
          location_Address: location.location_Address,
          createBy: location.createBy,
          user_ID: user.userId,
          status: location.status,
        });
        if (selectedFiles.length > 0) {
          for (const file of selectedFiles) {
            const photoFormData = new FormData();
            photoFormData.append('file', file);
            const response = await uploadPhoto(location.location_ID, photoFormData);
            setLocation(prev => ({
              ...prev,
              location_Photos: [...prev.location_Photos, { id: response.photo_ID, url: response.photo_URL }],
            }));
            setPreviewUrls(prev => [...prev, { id: response.photo_ID, url: `http://localhost:8080${response.photo_URL}` }]);
          }
        }
        toast.success('Cập nhật địa điểm thành công!');
      } else {
        const newLocation = await addLocation(formData);
        if (newLocation && newLocation.location_Photos) {
          setPreviewUrls(newLocation.location_Photos.map(photo => ({
            id: photo.id,
            url: `http://localhost:8080${photo.url}`,
          })));
        }
        setLocation(prev => ({ ...prev, location_ID: newLocation.location_ID }));
        toast.success('Thêm địa điểm thành công!');
      }
      navigate('/admin/locations');
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
        {isEditMode ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Tên địa điểm</label>
            <input
              type="text"
              name="location_Name"
              value={location.location_Name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nhập tên địa điểm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Chi phí (VNĐ)</label>
            <input
              type="number"
              name="location_Cost"
              value={location.location_Cost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nhập chi phí trung bình"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Địa chỉ</label>
            <input
              type="text"
              name="location_Address"
              value={location.location_Address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nhập địa chỉ cụ thể"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mô tả</label>
            <textarea
              name="location_Description"
              value={location.location_Description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows="4"
              placeholder="Mô tả chi tiết về địa điểm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={location.status}
              onChange={handleInputChange}
              className="mr-2 h-5 w-5"
            />
            <label className="text-gray-700 font-medium">Hoạt động</label>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Ảnh địa điểm</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-2 block"
          />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewUrls.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.url}
                  alt="Location"
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/admin/locations')}
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

export default LocationForm;