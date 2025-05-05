import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Common/Header';
import { getTimelinesByUserId, addTimeline, deleteTimeline } from '../services/eventService';

// TODO: Thêm chức năng sửa ten lịch trình
const TimelineList = () => {
  const navigate = useNavigate();
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTimelineName, setNewTimelineName] = useState('');

  // Lấy userId từ localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId; // Sử dụng userId thay vì id
  const token = user?.token;

  // Lấy danh sách timeline khi component mount
  useEffect(() => {
    if (!userId || !token) {
      toast.error('Vui lòng đăng nhập để xem lịch trình!');
      navigate('/login');
      return;
    }

    const fetchTimelines = async () => {
      setLoading(true);
      try {
        const data = await getTimelinesByUserId(userId);
        setTimelines(data);
      } catch (error) {
        toast.error(error.message || 'Không thể tải danh sách lịch trình!');
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [userId, token, navigate]);

  // Xử lý thêm timeline mới
  const handleAddTimeline = async () => {
    if (!newTimelineName.trim()) {
      toast.error('Tên lịch trình không được để trống!');
      return;
    }

    setLoading(true);
    try {
      const newTimeline = await addTimeline({
        timeLine_Name: newTimelineName,
        user_ID: userId,
      });
      setTimelines([...timelines, newTimeline]);
      toast.success('Thêm lịch trình thành công!');
      setShowModal(false);
      setNewTimelineName('');
    } catch (error) {
      toast.error(error.message || 'Thêm lịch trình thất bại!');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa timeline
  const handleDeleteTimeline = async (timelineId) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch trình này?')) return;

    setLoading(true);
    try {
      await deleteTimeline(timelineId);
      setTimelines(timelines.filter((timeline) => timeline.timeLine_ID !== timelineId));
      toast.success('Xóa lịch trình thành công!');
    } catch (error) {
      toast.error(error.message || 'Xóa lịch trình thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6 max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Danh sách lịch trình</h1>

        {/* Nút thêm lịch trình */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Thêm lịch trình mới'}
        </button>

        {/* Trạng thái tải */}
        {loading && (
          <div className="text-center text-gray-600">Đang tải lịch trình...</div>
        )}

        {/* Danh sách timeline */}
        {!loading && timelines.length === 0 && (
          <div className="text-center text-gray-600">
            Bạn chưa có lịch trình nào. Hãy tạo lịch trình mới!
          </div>
        )}

        {!loading && timelines.length > 0 && (
          <div className="grid gap-4">
            {timelines.map((timeline) => (
              <div
                key={timeline.timeLine_ID}
                className="p-4 bg-white border rounded-lg flex justify-between items-center hover:bg-purple-50 transition"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/timelines/${timeline.timeLine_ID}`)}
                >
                  <h2 className="text-lg font-semibold text-purple-600">
                    {timeline.timeLine_Name}
                  </h2>
                </div>
                <button
                  onClick={() => handleDeleteTimeline(timeline.timeLine_ID)}
                  className="text-red-500 hover:text-red-700 font-medium"
                  disabled={loading}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal thêm lịch trình */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Thêm lịch trình mới</h2>
              <input
                type="text"
                value={newTimelineName}
                onChange={(e) => setNewTimelineName(e.target.value)}
                placeholder="Nhập tên lịch trình"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddTimeline}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Đang thêm...' : 'Thêm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default TimelineList;