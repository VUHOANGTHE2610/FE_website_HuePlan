import React, { useState } from 'react';
import TimelineView from './TimelineView';
import XacNhanXoaModal from './XacNhanXoaModal';

// Component chính quản lý các tab ngày và sự kiện
const TimelineTabs = () => {
  // Trạng thái lưu danh sách sự kiện theo ngày
  const [eventsByDay, setEventsByDay] = useState([[], [], []]);
  // Trạng thái lưu index của ngày đang chọn
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  // Trạng thái kiểm soát hiển thị modal xác nhận xóa ngày
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Trạng thái lưu index của ngày cần xóa
  const [deleteIndex, setDeleteIndex] = useState(null);
  // Trạng thái loading khi xử lý thêm/xóa
  const [isLoading, setIsLoading] = useState(false);
  // Trạng thái lỗi khi xử lý
  const [error, setError] = useState(null);

  // Hàm xử lý xóa một ngày
  const handleDeleteDay = (index) => {
    console.log('Xóa ngày tại index:', index); // Debug: kiểm tra index
    console.log('Trước khi xóa, eventsByDay:', eventsByDay); // Debug: kiểm tra state

    setIsLoading(true); // Bật trạng thái loading
    setError(null); // Reset lỗi
    try {
      const updatedEvents = [...eventsByDay];
      updatedEvents.splice(index, 1); // Xóa ngày tại index
      setEventsByDay(updatedEvents);
      // Cập nhật ngày đang chọn
      setSelectedDayIndex((prev) =>
        prev === index ? Math.max(0, index - 1) : prev > index ? prev - 1 : prev
      );
      console.log('Sau khi xóa, eventsByDay:', updatedEvents); // Debug: kiểm tra state sau khi xóa
      alert('Ngày đã bị xóa!');
    } catch (err) {
      setError('Không thể xóa ngày.');
      console.error('Lỗi khi xóa ngày:', err); // Debug: ghi lại lỗi
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
      setShowDeleteModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="w-full">
      {/* Thanh tabs các ngày + nút thêm ngày */}
      <div className="flex items-center border-b mb-4 overflow-x-auto">
        {eventsByDay.map((_, index) => (
          <div key={index} className="relative group flex items-center min-w-[120px]">
            <button
              onClick={() => setSelectedDayIndex(index)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                selectedDayIndex === index
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-purple-500'
              }`}
            >
              Ngày {index + 1}
            </button>
            {/* Nút xóa ngày */}
            {eventsByDay.length > 1 && (
              <button
                onClick={() => {
                  console.log('Mở modal xóa ngày tại index:', index); // Debug: kiểm tra khi mở modal
                  setDeleteIndex(index);
                  setShowDeleteModal(true);
                }}
                className="text-red-400 text-sm px-2 py-1 hover:text-red-600 absolute -right-4 top-1/2 -translate-y-1/2 hidden group-hover:block"
                title="Xóa ngày này"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        {/* Nút thêm ngày mới */}
        <button
          onClick={() => {
            setEventsByDay([...eventsByDay, []]);
            setSelectedDayIndex(eventsByDay.length);
          }}
          className="ml-2 px-3 text-lg text-purple-600 hover:text-purple-800 transition"
          title="Thêm ngày mới"
        >
          +
        </button>
      </div>

      {/* Hiển thị trạng thái loading */}
      {isLoading && <div className="text-center p-4">Đang xử lý...</div>}
      {/* Hiển thị lỗi nếu có */}
      {error && <div className="text-red-600 p-4">{error}</div>}

      {/* Component hiển thị timeline của ngày đang chọn */}
      <TimelineView
        events={eventsByDay[selectedDayIndex]}
        setEvents={(newEvents) => {
          const updatedEvents = [...eventsByDay];
          updatedEvents[selectedDayIndex] = newEvents;
          setEventsByDay(updatedEvents);
        }}
      />
      {/* Modal xác nhận xóa ngày */}
      {deleteIndex !== null && (
        <XacNhanXoaModal
          show={showDeleteModal}
          dayName={`Ngày ${deleteIndex + 1}`}
          onClose={() => {
            console.log('Đóng modal xóa'); // Debug: kiểm tra khi đóng modal
            setShowDeleteModal(false);
            setDeleteIndex(null);
          }}
          onDelete={() => handleDeleteDay(deleteIndex)}
        />
      )}
    </div>
  );
};

export default TimelineTabs;